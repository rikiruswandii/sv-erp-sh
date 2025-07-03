import * as contactModule from '$lib/server/contact';
import { contactSchema } from '$lib/schemas/contact/contact';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ params }) => {
	const contact = await contactModule.getContactById(params.id);
	console.log('[LOAD] Memuat contact dengan ID:', params.id);

	if (!contact) throw error(404, 'contact tidak ditemukan');

	if (contact.id && !contact.isRead) {
		await contactModule.updateContact(contact.id, { isRead: true });
	}

	return {
		contact,
		form: await superValidate(contact, zod(contactSchema))
	};
};
