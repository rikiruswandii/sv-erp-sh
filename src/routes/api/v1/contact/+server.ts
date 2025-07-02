// src/routes/api/contact/+server.ts
import * as contact from '$lib/server/contact';
import { superValidate } from 'sveltekit-superforms';
import { contactSchema } from '$lib/schemas/contact/contact';
import { zod } from 'sveltekit-superforms/adapters';
import { generateUserId } from '$lib/hooks/useUserId';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	console.log('📥 Menerima request POST ke /api/contact');

	const form = await superValidate(event, zod(contactSchema));
	console.log('📄 Data form yang diterima:', form.data);

	if (!form.valid) {
		console.warn('⚠️ Validasi form gagal:', form.errors);
		return json({ success: false, errors: form.errors }, { status: 400 });
	}

	const { firstName, lastName, company, email, phoneNumber, message, agreedPolicy } = form.data;
	const userId = generateUserId();

	console.log('🆔 Generated userId:', userId);

	try {
		await contact.createContact({
			id: userId,
			firstName,
			lastName,
			company,
			email,
			phoneNumber,
			message,
			agreedPolicy
		});

		console.log('✅ Kontak berhasil disimpan');
		return json({ success: true, message: 'Pesan anda telah terkirim.' });
	} catch (e: any) {
		console.error('❌ Gagal menyimpan kontak:', e);
		return json({ success: false, message: 'Gagal gagal mengirim pesan' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	console.log('🗑️ Menerima request DELETE ke /api/contact');

	const data = await request.json();
	const idRaw = data.id;
	console.log('🔎 ID yang diterima:', idRaw);

	if (!idRaw || typeof idRaw !== 'string' || idRaw.trim() === '') {
		console.warn('⚠️ ID tidak valid');
		return json({ success: false, message: 'ID tidak valid' }, { status: 400 });
	}

	try {
		await contact.deleteContact(idRaw);
		console.log('✅ Contact berhasil dihapus:', idRaw);
		return json({ success: true, message: 'Contact berhasil dihapus' });
	} catch (e) {
		console.error('❌ Gagal menghapus contact:', e);
		return json({ success: false, message: 'Gagal menghapus contact' }, { status: 500 });
	}
};
