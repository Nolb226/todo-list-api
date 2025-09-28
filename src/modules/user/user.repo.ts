import prisma from '@/db/prisma';

const userRepo = {
	createUser: (data: { email: string; name: string; password: string }) => {
		return prisma.user.create({ data });
	},
	findByEmail: (email: string) => {
		return prisma.user.findUnique({ where: { email } });
	},
};

export default userRepo;
