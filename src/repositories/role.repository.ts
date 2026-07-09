import prisma from "../utils/prisma";

export const RoleRepository = {
  findByName: (name: string) => {
    return prisma.role.findUnique({ where: { name }, include: { permissions: true } });
  },
  findById: (id: number) => {
    return prisma.role.findUnique({ where: { id }, include: { permissions: true } });
  },
};