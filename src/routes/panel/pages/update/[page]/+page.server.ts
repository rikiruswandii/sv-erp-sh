import { pageSchema } from '$lib/schemas/page/page';
import * as pageModule from '$lib/server/page';
import { superValidate } from 'sveltekit-superforms';
import type { Actions, LayoutServerLoad } from './$types';
import { fail, error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { useSlug } from '$lib/hooks/useSlug';

export const load: LayoutServerLoad = async ({ params }) => {
    const page = await pageModule.getPageById(params.page);
    console.log('[LOAD] Memuat page dengan ID:', params.page);

    if (!page) throw error(404, 'page tidak ditemukan');

    // Isi form dengan data page yang ditemukan
    return {
        page,
        form: await superValidate(
            {
                title: page.title ?? '',
                description: page.description ?? '',
                content: page.content ?? '',
                published: page.published ?? false
            },
            zod(pageSchema)
        )
    };
};

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(pageSchema));

        if (!form.valid) {
            return fail(400, {
                form,
                error: { message: 'Please check your input' }
            });
        }

        const { title, description, content, published } = form.data;
        const slug = useSlug(title);

        try {
            // Ambil id dari params
            const id = event.params.page;

            await pageModule.updatePage(id, {
                title,
                description,
                slug,
                content,
                published,
            });
            return {
                form,
                success: true
            };

        } catch (e) {
            if (typeof e === 'object' && e !== null && 'code' in e) {
                const err = e as { code: string };
                if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
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