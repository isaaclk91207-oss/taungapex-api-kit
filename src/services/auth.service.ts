import { UserRepository } from "../repositories/user.repository";
import { RoleRepository } from "../repositories/role.repository";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository";
import { hashPassword, comparePassword } from "../utils/password";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { generateOTP, getOtpExpiry } from "../utils/otp";
import { OtpRepository } from "../repositories/otp.repository";
import { sendOtpEmail } from "../utils/email";
import { JwtPayload } from "../types";

export const AuthService = {
  register: async (data: { email: string; password: string; name?: string; phone?: string }) => {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) throw new Error("Email already registered");

    const defaultRole = await RoleRepository.findByName("user");
    if (!defaultRole) throw new Error("Default role not found");

    const hashedPassword = await hashPassword(data.password);
    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
      roleId: defaultRole.id,
    });

    const payload: JwtPayload = { userId: user.id, email: user.email, role: defaultRole.name };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await RefreshTokenRepository.create(refreshToken, user.id, getOtpExpiry(7 * 24 * 60));

    return { user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken };
  },

  login: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");
    if (!user.isActive) throw new Error("Account is deactivated");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid email or password");

    const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role.name };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await RefreshTokenRepository.create(refreshToken, user.id, getOtpExpiry(7 * 24 * 60));

    return { user: { id: user.id, email: user.email, name: user.name, role: user.role.name }, accessToken, refreshToken };
  },

  refresh: async (token: string) => {
    const stored = await RefreshTokenRepository.findByToken(token);
    if (!stored) throw new Error("Invalid refresh token");
    if (stored.expiresAt < new Date()) throw new Error("Refresh token expired");

    const payload = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({ userId: payload.userId, email: payload.email, role: payload.role });

    return { accessToken: newAccessToken };
  },

  logout: async (refreshToken: string) => {
    await RefreshTokenRepository.deleteByToken(refreshToken);
  },

  getMe: async (userId: number) => {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role.name, isActive: user.isActive, createdAt: user.createdAt };
  },
};
