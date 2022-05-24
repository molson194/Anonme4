import type { Handle, GetSession } from '@sveltejs/kit';
import { parse } from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.accessTokenExists = parse(event.request.headers.get("cookie") || "").accessToken != null
	const response = await resolve(event);
	return response;
};

export const getSession : GetSession = (request) => {
	return {
		accessTokenExists: request.locals.accessTokenExists
	}
}