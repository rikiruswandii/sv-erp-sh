// src/routes/panel/subscription/+page.server.ts
import * as newsletterModule from '$lib/server/newsletter';
import { superValidate } from 'sveltekit-superforms';
import { idSchema } from '$lib/schemas/destroy';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const subscription = await newsletterModule.getAllNewsletter();

    return {
        subscription,
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
            await newsletterModule.deleteNewsletter(form.data.id);
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


