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
	const form = await request.formData();

	await prisma.org.create({
		data: {
			name: form.get('name')?.toString()!,
			createdBy: "Matt"
		}
	})

	return {};
};