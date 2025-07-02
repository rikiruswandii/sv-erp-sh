// src/routes/api/subscription/+server.ts
import * as newsletter from '$lib/server/newsletter';
import { superValidate } from 'sveltekit-superforms';
import { newsletterSchema } from '$lib/schemas/newsletter/newsletter';
import { zod } from 'sveltekit-superforms/adapters';
import { generateUserId } from '$lib/hooks/useUserId';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	console.log('[POST] Subscription - Mulai memproses request...');

	const form = await superValidate(event, zod(newsletterSchema));
	console.log('[POST] Validasi form:', form);

	if (!form.valid) {
		console.warn('[POST] Validasi gagal:', form.errors);
		return json({ success: false, errors: form.errors }, { status: 400 });
	}

	const { email } = form.data;
	const userId = generateUserId();
	console.log('[POST] Data valid. Email:', email, '| Generated User ID:', userId);

	try {
        // 🔍 Cek apakah email sudah terdaftar
		const existing = await newsletter.getNewsletterByEmail(email);
		if (existing) {
			console.warn('[POST] Email sudah terdaftar:', email);
			return json(
				{
					success: false,
					errors: {
						email: ['Email sudah terdaftar']
					}
				},
				{ status: 400 }
			);
		}
		await newsletter.createNewsletter({
			id: userId,
			email: email
		});
		console.log('[POST] Subscription berhasil dibuat');
		return json({ success: true, message: 'Terimakasih telah berlangganan.' });
	} catch (e) {
		console.error('[POST] Error saat menyimpan ke database:', e);

		if (typeof e === 'object' && e !== null && 'code' in e) {
			const err = e as { code: string };
			if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
				console.warn('[POST] Email sudah digunakan:', email);
				return json(
					{
						success: false,
						errors: {
							email: ['Email sudah digunakan']
						}
					},
					{ status: 400 }
				);
			}
		}

		return json({ success: false, message: 'Gagal melakukan langganan.' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	console.log('[DELETE] Subscription - Memproses request hapus');

	const data = await request.json();
	const idRaw = data.id;
	console.log('[DELETE] Data diterima:', data);

	if (!idRaw || typeof idRaw !== 'string' || idRaw.trim() === '') {
		console.warn('[DELETE] ID tidak valid:', idRaw);
		return json({ success: false, message: 'ID tidak valid' }, { status: 400 });
	}

	try {
		await newsletter.deleteNewsletter(idRaw);
		console.log('[DELETE] Subscription berhasil dihapus untuk ID:', idRaw);
		return json({ success: true, message: 'Subscription berhasil dihapus' });
	} catch (e) {
		console.error('[DELETE] Gagal menghapus subscription:', e);
		return json({ success: false, message: 'Gagal menghapus subscription' }, { status: 500 });
	}
};
