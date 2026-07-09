import prisma from "../utils/prisma";

export const RefreshTokenRepository = {
  create: (token: string, userId: number, expiresAt: Date) => {
    return prisma.refreshToken.create({ data: { token, userId, expiresAt } });
  },
  findByToken: (token: string) => {
    return prisma.refreshToken.findUnique({ where: { token }, include: { user: { include: { role: true } } } });
  },
  deleteByToken: (token: string) => {
    return prisma.refreshToken.deleteMany({ where: { token } });
  },
  deleteExpired: () => {
    return prisma.refreshToken.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  },
};