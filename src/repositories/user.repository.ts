import prisma from "../utils/prisma";

export const UserRepository = {
    create: (data: { email: string; password: string; name?: string; phone?: string; roleId: number }) => {
        return prisma.user.create({ data });
    },
    findByEmail: (email: string) => {
        return prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    },
    findById: (id: number) => {
        return prisma.user.findUnique({
            where: { id },
            include: { role: true },
        });
    },
    findByPhone: (phone: string) => {
        return prisma.user.findUnique({
            where: { phone },
            include: { role: true },
        });
    },
    update: (id: number, data: any) => {
        return prisma.user.update({ where: { id }, data });
    },
};
