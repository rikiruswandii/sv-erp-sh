import * as userService from '$lib/server/user';
import type { Actions, PageServerLoad } from './$types';
import { fail, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    return {};
};
