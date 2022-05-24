import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { validate } from '$lib/auth';

const prisma = new PrismaClient();

export const get: RequestHandler = async ({ request, locals }) => {
	try {
		await validate(request.headers)

		return {
			body: {
				orgs: await prisma.org.findMany()
			}
		};
	} catch (error) {
		console.log(error)

		return {
			status: 401
		}
	}
};

export const post: RequestHandler = async ({ request, locals }) => {
	try {
		await validate(request.headers)
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
	} catch (error) {
		console.log(error)

		return {
			status: 401
		}
	}
};