import { sequence } from '@sveltejs/kit/hooks';
import * as auth from '$lib/server/auth.js';
import { error, type Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleRoute: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
  
	if (response.status === 404) {
	  // Lempar ulang error agar `+error.svelte` dirender
	  throw error(404, `Halaman ${event.url.pathname} tidak ditemukan`);
	}
  
	return response;
};

const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	event.request = request;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
	});
});

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth, handleRoute);
