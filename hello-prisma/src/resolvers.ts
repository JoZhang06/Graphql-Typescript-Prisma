import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        users: async () => {
            return prisma.user.findMany();
        },
        user: async (_: any, args: { id: number }) => {
            const { id } = args;
            return prisma.user.findUnique({
                where: { id },
            });
        },
    },
    Mutation: {
        createUser: async (
            _: any,
            args: { email: string; name: string; Admin: boolean }
        ) => {
            const { email, name, Admin } = args;
            return prisma.user.create({
                data: {
                    email,
                    name,
                    Admin,
                },
            });
        },
        updateUser: async (
            _: any,
            args: { id: number; email: string; name: string; Admin: boolean }
        ) => {
            const { id, email, name, Admin } = args;
            return prisma.user.update({
                where: { id },
                data: {
                    email,
                    name,
                    Admin,
                },
            });
        },
        deleteUser: async (_: any, args: { id: number }) => {
            const { id } = args;
            return prisma.user.delete({
                where: { id },
            });
        },
    },
};

export default resolvers;
