import type { Handle, GetSession } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// if event.request.headers has cookie with accessToken, set the request.locals.accessToken to that token
	event.locals.accessToken = event.request.headers.get("cookie")

	const response = await resolve(event);
	return response;
};

export const getSession : GetSession = (request) => {
	return {
		accessToken: request.locals.accessToken
	}
}