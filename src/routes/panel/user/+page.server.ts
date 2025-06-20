// src/routes/panel/user/+page.server.ts

import * as user from '$lib/server/user';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/user/user';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import { generateUserId } from '$lib/hooks/useUserId';
import { useInitials } from '$lib/hooks/useInitials';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { destroySchema } from '$lib/schemas/user/destroy';
import { resetSchema } from '$lib/schemas/user/reset';
import 'dotenv/config';


export const load: PageServerLoad = async () => {
	const [users, sessions, projects, tasks] = await Promise.all([
		user.getAllUsers(),
		user.getSessions(),
		user.getProjects(),
		user.getTasks()
	]);

	const sessionMap = Object.groupBy(sessions, s => s.userId);
	const projectMap = Object.groupBy(projects, p => p.userId);
	const taskMap = Object.groupBy(tasks, t => t.userId);

	const allUserWithData = users.map((u) => ({
		...u,
		initials: useInitials(u.name),
		sessions: sessionMap[u.id] ?? [],
		projects: projectMap[u.id] ?? [],
		tasks: taskMap[u.id] ?? [],
	}));

	return {
		allUser: allUserWithData,
		countAllUser: users.length,
		formDestroy: await superValidate(zod(destroySchema)),
		form: await superValidate(zod(formSchema)),
		formReset: await superValidate(zod(resetSchema)),
	};
};

export const actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form,
				error: { message: 'Please check your input' }
			});
		}

		const { name, email, password, roleId } = form.data;
		const userId = generateUserId();

		try {
			const passwordHash = await hash(password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			});

			await user.createUser({
				id: userId,
				roleId: String(roleId),
				name,
				email,
				passwordHash,
				emailVerified: true
			});

			return {
				form,
				success: true
			};

		} catch (e) {
			if (typeof e === 'object' && e !== null && 'code' in e) {
				const err = e as { code: string };
				if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
					return fail(400, {
						form,
						error: { message: 'Email already in use' }
					});
				}
				return fail(500, {
					form,
					error: { message: 'An error occurred, please try again' }
				});
			}
			throw e;
		}
	},
	reset: async (event) => {
		const form = await superValidate(event, zod(resetSchema));

		if (!form.valid) {
			return fail(400, {
				form,
				error: { message: 'ID tidak valid' }
			});
		}

		if (!process.env.PASSWORD_DEFAULT) {
			throw new Error('PASSWORD_DEFAULT environment variable is not set.');
		}

		try {
			const passwordHash = await hash(process.env.PASSWORD_DEFAULT, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			});

			await user.updateUserPassword(form.data.id, passwordHash);

			return {
				form,
				success: true,
				message: 'Password berhasil direset'
			};
		} catch (e) {
			return fail(500, {
				form,
				error: { message: 'Gagal mereset password' }
			});
		}
	},	
	destroy: async (event) => {
		const form = await superValidate(event, zod(destroySchema));

		if (!form.valid) {
			return fail(400, {
				form, // ubah dari formDestroy ke form
				error: { message: 'ID tidak valid' }
			});
		}

		try {
			await user.deleteUser(form.data.id);
			return {
				form, // ubah dari formDestroy ke form
				success: true
			};
		} catch (e) {
			if (typeof e === 'object' && e !== null && 'code' in e) {
				const err = e as { code: string };
				if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
					return fail(400, {
						form, // ubah dari formDestroy ke form
						error: { message: 'Gagal menghapus user karena constraint database.' }
					});
				}
				return fail(500, {
					form, // ubah dari formDestroy ke form
					error: { message: 'Terjadi kesalahan saat menghapus user.' }
				});
			}
			throw e;
		}
	}
} satisfies Actions;
