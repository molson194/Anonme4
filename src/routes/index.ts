import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const get: RequestHandler = async ({ locals }) => {
	return {
		body: {
			orgs: await prisma.org.findMany()
		}
	};
};

export const post: RequestHandler = async ({ request, locals }) => {
	const body = await request.json()

	const newOrg = await prisma.org.create({
		data: {
			name: body['groupName'],
			createdBy: "Matt"
		}
	})

	return {
		body : {
			org: newOrg
		}
	}
};