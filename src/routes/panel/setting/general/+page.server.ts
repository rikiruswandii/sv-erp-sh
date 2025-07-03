// src/routes/panel/page/+page.server.ts

import * as pageModule from '$lib/server/page';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { useSlug } from '$lib/hooks/useSlug';
import { generateUserId } from '$lib/hooks/useUserId';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { pageSchema } from '$lib/schemas/page/page';

export const load: PageServerLoad = async () => {
    console.log('[LOAD] Menyiapkan form page');
    return {
        form: await superValidate(zod(pageSchema))
    };
};

export const actions = {
    default: async (event) => {
        console.log('[ACTION] Menerima request form');

        const form = await superValidate(event, zod(pageSchema));
        console.log('[ACTION] Validasi form:', form);

        if (!form.valid) {
            console.warn('[ACTION] Form tidak valid:', form.errors);
            return fail(400, {
                form,
                error: { message: 'Please check your input' }
            });
        }

        const { title, description, content, published } = form.data;
        const pageId = generateUserId();
        const slug = useSlug(title);

        console.log('[ACTION] Data akan disimpan:', {
            id: pageId,
            title,
            slug,
            description,
            contentLength: content.length,
            published
        });

        try {
            await pageModule.createPage({
                id: pageId,
                title: title,
                description: description,
                slug: slug,
                content: content,
                published: published,
            });

            console.log('[ACTION] Page berhasil dibuat:', pageId);

            return {
                form,
                success: true
            };

        } catch (e) {
            console.error('[ACTION] Terjadi error saat menyimpan:', e);

            if (typeof e === 'object' && e !== null && 'code' in e) {
                const err = e as { code: string };
                if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
                    console.warn('[ACTION] Duplikat entri:', err.code);
                    return fail(400, {
                        form,
                        error: { message: 'An error' }
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
} satisfies Actions;
