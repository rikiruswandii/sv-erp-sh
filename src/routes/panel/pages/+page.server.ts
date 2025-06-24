// src/routes/panel/page/+page.server.ts

import * as pageModule from '$lib/server/page';
import type { PageServerLoad } from './$types';
import * as user from '$lib/server/user';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/user/user';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import { generateUserId } from '$lib/hooks/useUserId';
import { useInitials } from '$lib/hooks/useInitials';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';



export const load: PageServerLoad = async () => {
    const page = await pageModule.getAllPage();

    return {
        page
    };
};



