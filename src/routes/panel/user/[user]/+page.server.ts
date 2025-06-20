import * as userService from '$lib/server/user';
import type { Actions, PageServerLoad } from './$types';
import { fail, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    console.log('params', params);

    const user = await userService.getUserById(params.user);

    if (!user) throw error(404, 'User tidak ditemukan');

    return {
        user,
    };
};
