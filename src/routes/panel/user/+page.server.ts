import * as user from '$lib/server/user';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/user/user';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import { useInitials, generateUserId } from '$lib/hooks/useInitials';
import type { Actions, PageServerLoad } from './$types';

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
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		// Ambil confirmPassword agar destructuring sesuai schema
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { name, email, password, confirmPassword, roleId } = form.data;
		// confirmPassword tidak digunakan untuk proses selanjutnya, hanya validasi

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		try {
			await user.createUser({
				id: userId,
				roleId: roleId,
				name,
				email,
				passwordHash,
				emailVerified: true
			});

			throw redirect(302, '/panel/user');
		} catch (e) {
			if (typeof e === 'object' && e !== null && 'code' in e) {
				const err = e as { code: string };

				console.error(err);

				// Tangani unique constraint error (email sudah ada)
				if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
					form.errors.email = ['Email sudah digunakan'];
					return fail(400, { form });
				}
			}

			// Fallback jika error lainnya
			return fail(500, { form, message: 'Terjadi kesalahan saat menambahkan pengguna.' });
		}
	},
};
