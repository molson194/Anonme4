import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { validate } from '$lib/auth';
import type { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';

const prisma = new PrismaClient();

export const get: RequestHandler = async ({ request, params }) => {
	var payload : CognitoAccessTokenPayload;
	try {
		payload = await validate(request.headers)
	} catch (error) {
		console.log(error)

		return {
			status: 401
		}
	}

	try {
		await userBelongsToOrg(params.id, payload.sub)
	} catch (error) {
		console.log(error)

		return {
			body: {
				hasAccess: false,
				messages: []
			}
		}
	}
		
	return {
		body: {
			messages: await prisma.message.findMany({
				where: {
					orgId: params.id
				}
			}),
			hasAccess: true
		}
	};
};

export const post: RequestHandler = async ({ request, params, clientAddress, locals, platform, routeId, url }) => {
	var payload : CognitoAccessTokenPayload
	try {
		payload = await validate(request.headers)
	} catch (error) {
		console.log(error)

		return {
			status: 401
		}
	}
	
	const body = await request.json()

	if (body['newMessage']) {
		try {
			await userBelongsToOrg(params.id, payload.sub)
		} catch (error) {
			console.log(error)

			return {
				status: 401
			}
		}

		const newMessage = await prisma.message.create({
			data: {
				text: body['newMessage'],
				userId: payload.sub,
				orgId: params.id
			}
		})

		return {
			body : {
				message: newMessage
			}
		}
	} else {
		try {
			const accessCode = body['accessCode']
			const org = await prisma.org.findFirst({
				rejectOnNotFound: true,
				where: {
					id: params.id
				}
			})

			if (org.accessCode == accessCode) {
				await prisma.orgMembership.create({
					data: {
						orgId: params.id,
						userId: payload.sub
					}
				})
			} else {
				console.log("Access code incorrect")

				return {
					status: 401
				}
			}
		} catch {
			console.log("Org does not exist")

			return {
				status: 404
			}
		}

		return get({request, params, clientAddress, locals, platform, routeId, url})
	}
};

async function userBelongsToOrg(orgId: string, userId: string) {
	await prisma.orgMembership.findFirst({
		rejectOnNotFound: true,
		where: {
			orgId:  orgId,
			userId: userId
		}
	})
}