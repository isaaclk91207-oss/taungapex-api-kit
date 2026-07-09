import { UserRepository } from "../repositories/user.repository";
import { OtpRepository } from "../repositories/otp.repository";
import { hashPassword } from "../utils/password";
import { generateOtp, getOtpExpiry } from "../utils/otp";
import { sendOtpEmail } from "../utils/email";

export const PasswordService = {
  forgotPassword: async (email: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Email not found");

    const code = generateOtp();
    const expiresAt = getOtpExpiry(10);
    await OtpRepository.create(code, user.id, "reset_password", expiresAt);
    await sendOtpEmail(email, code);

    return { message: "OTP sent to your email" };
  },

  resetPassword: async (email: string, code: string, newPassword: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Email not found");

    const otp = await OtpRepository.findValid(user.id, "reset_password");
    if (!otp) throw new Error("No valid OTP found");
    if (otp.code !== code) throw new Error("Invalid OTP code");

    await OtpRepository.markUsed(otp.id);
    const hashed = await hashPassword(newPassword);
    await UserRepository.update(user.id, { password: hashed });

    return { message: "Password reset successfully" };
  },
};