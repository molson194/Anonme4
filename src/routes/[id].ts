import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const get: RequestHandler = async ({ params }) => {
	return {
		body: {
			messages: await prisma.message.findMany({
        where: {
          orgId: params.id
        }
      })
		}
	};
};

export const post: RequestHandler = async ({ request, params }) => {
	const form = await request.formData();

	await prisma.message.create({
		data: {
			text: form.get('text')?.toString()!,
			userId: "Matt",
      orgId: params.id
		}
	})

	return {};
};