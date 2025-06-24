// src/routes/panel/page/+page.server.ts

import * as pageModule from '$lib/server/page';
import { superValidate } from 'sveltekit-superforms';
import { idSchema } from '$lib/schemas/destroy';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';



export const load: PageServerLoad = async () => {
    const page = await pageModule.getAllPage();

    return {
        page,
        formDestroy: await superValidate(zod(idSchema))
    };
};

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(idSchema));

        if (!form.valid) {
            return fail(400, {
                form, // ubah dari formDestroy ke form
                error: { message: 'ID tidak valid' }
            });
        }

        try {
            await pageModule.deletePage(form.data.id);
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
                        error: { message: 'Gagal menghapus page karena constraint database.' }
                    });
                }
                return fail(500, {
                    form, // ubah dari formDestroy ke form
                    error: { message: 'Terjadi kesalahan saat menghapus page.' }
                });
            }
            throw e;
        }
    }
} satisfies Actions;


