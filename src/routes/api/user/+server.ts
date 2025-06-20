// src/routes/api/user/+server.ts
import * as user from '$lib/server/user';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/user/user';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import { generateUserId } from '$lib/hooks/useUserId';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	const form = await superValidate(event, zod(formSchema));

	if (!form.valid) {
		return json({ success: false, errors: form.errors }, { status: 400 });
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

		return json({ success: true, message: 'User berhasil ditambahkan' });
	} catch (e) {
		if (typeof e === 'object' && e !== null && 'code' in e) {
			const err = e as { code: string };
			if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
				return json({
					success: false,
					errors: {
						email: ['Email sudah digunakan']
					}
				}, { status: 400 });
			}
		}

		return json({ success: false, message: 'Gagal menambahkan user' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const idRaw = data.id;

    if (!idRaw || typeof idRaw !== 'string' || idRaw.trim() === '') {
        return json({ success: false, message: 'ID tidak valid' }, { status: 400 });
    }    

	try {
		await user.deleteUser(idRaw);
		return json({ success: true, message: 'User berhasil dihapus' });
	} catch (e) {
		return json({ success: false, message: 'Gagal menghapus user' }, { status: 500 });
	}
};
