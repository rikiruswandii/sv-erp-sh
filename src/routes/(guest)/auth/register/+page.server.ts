import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, '/panel');
	}
	return {
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
		const { name, email, password, confirmPassword } = form.data;
		// confirmPassword tidak digunakan untuk proses selanjutnya, hanya validasi

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		try {
			await db.insert(table.users).values({
				id: userId,
				name,
				email,
				passwordHash,
			});

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

			throw redirect(302, '/panel');
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
			return fail(500, { form, message: 'Terjadi kesalahan saat registrasi.' });
		}
	},
};

function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}
