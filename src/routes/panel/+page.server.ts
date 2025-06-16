import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const user = requireLogin(event);
  return { user };
};

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }

    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, '/'); // tidak perlu /auth/login karena URL tetap /login
  },
};

// Memeriksa apakah user sudah login
function requireLogin(event: Parameters<PageServerLoad>[0]) {
  if (!event.locals.user) {
    throw redirect(302, '/auth/login');
  }

  return event.locals.user;
}
