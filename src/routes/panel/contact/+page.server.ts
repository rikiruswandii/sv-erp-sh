// src/routes/panel/contact/+page.server.ts
import * as contactModule from '$lib/server/contact';
import { superValidate } from 'sveltekit-superforms';
import { idSchema } from '$lib/schemas/destroy';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const contact = await contactModule.getAllContact();

    return {
        contact,
        formDestroy: await superValidate(zod(idSchema))
    };
};

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(idSchema));

        if (!form.valid) {
            return fail(400, {
                form,
                error: { message: 'ID tidak valid' }
            });
        }

        try {
            await contactModule.deleteContact(form.data.id);
            return {
                form,
                success: true
            };
        } catch (e:any) {
            return fail(500, {
                form, 
                error: { message: 'Terjadi kesalahan saat menghapus subscription.' }
            });
        }
    }
} satisfies Actions;


