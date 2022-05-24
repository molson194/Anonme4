import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { validate } from '$lib/auth';

const prisma = new PrismaClient();

export const get: RequestHandler = async ({ request, params }) => {
	try {
		await validate(request.headers)
		return {
			body: {
				messages: await prisma.message.findMany({
					where: {
						orgId: params.id
					}
				})
			}
		};
	} catch (error) {
		console.log(error)

		return {
			status: 401
		}
	}
};

export const post: RequestHandler = async ({ request, params }) => {
	try {
		await validate(request.headers)
		const body = await request.json()

		const newMessage = await prisma.message.create({
			data: {
				text: body['newMessage'],
				userId: "Matt",
				orgId: params.id
			}
		})

		return {
			body : {
				message: newMessage
			}
		}
	} catch (error) {
		console.log(error)

		return {
			status: 401
		}
	}
};