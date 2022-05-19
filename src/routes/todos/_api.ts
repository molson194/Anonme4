/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

import { PrismaClient } from '@prisma/client';

const base = 'https://api.svelte.dev';
const prisma = new PrismaClient();

export async function api(method: string, resource: string, data?: Record<string, unknown>) {
	const orgs = await prisma.org.findMany();
	for (const org of orgs) {
    console.log(`(${org.name}, ${org.id}, ${org.createdBy}, ${org.createdAt})`)
	}

	return fetch(`${base}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
}
