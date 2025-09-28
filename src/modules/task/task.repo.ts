import prisma from '@/db/prisma';
import { GetTaskQuery } from './task.schema';

const taskRepo = {
	listByFilter: async (currentUser: { id: string }, query: GetTaskQuery) => {
		const { page, limit } = query;
		const skip = (page - 1) * limit;
		const where = { userId: currentUser.id };

		const [data, total] = await prisma.$transaction([
			prisma.task.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			prisma.task.count({ where }),
		]);
		return { data, total, page, limit };
	},
	findById: (id: string) => {
		return prisma.task.findUnique({ where: { id } });
	},
	createTask: (data: {
		title: string;
		userId: string;
		description?: string;
	}) => {
		return prisma.task.create({
			data,
			select: {
				id: true,
				title: true,
				description: true,
				completed: true,
			},
		});
	},
	updateTask: (
		id: string,
		data: {
			title: string;
			userId: string;
			description?: string;
			completed?: boolean;
		}
	) => {
		return prisma.task.update({
			where: { id },
			data,
			select: {
				id: true,
				title: true,
				description: true,
				completed: true,
			},
		});
	},
	deleteTask: (id: string) => {
		return prisma.task.delete({ where: { id } });
	},
};
export default taskRepo;
