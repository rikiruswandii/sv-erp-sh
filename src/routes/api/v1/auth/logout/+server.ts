import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '../../../../panel/logout/$types';

export const POST: RequestHandler = async (event) => {
  if (!event.locals.session) {
    return new Response(null, { status: 401 });
  }

  await auth.invalidateSession(event.locals.session.id);
  auth.deleteSessionTokenCookie(event);

  throw redirect(302, '/');
};
