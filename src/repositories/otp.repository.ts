import prisma from "../utils/prisma";

export const OtpRepository = {
  create: (code: string, userId: number, type: string, expiresAt: Date) => {
    return prisma.otpCode.create({ data: { code, userId, type, expiresAt } });
  },
  findValid: (userId: number, type: string) => {
    return prisma.otpCode.findFirst({
      where: { userId, type, isUsed: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });
  },
  markUsed: (id: number) => {
    return prisma.otpCode.update({ where: { id }, data: { isUsed: true } });
  },
};