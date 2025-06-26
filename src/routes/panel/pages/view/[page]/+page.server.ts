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