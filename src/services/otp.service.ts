import { OtpRepository } from "../repositories/otp.repository";
import { UserRepository } from "../repositories/user.repository";
import { generateOtp, getOtpExpiry } from "../utils/otp";
import { sendOtpEmail } from "../utils/email";

export const OtpService = {
  sendOtp: async (userId: number, type: string) => {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (!user.email) throw new Error("User has no email address");

    const code = generateOtp();
    const expiresAt = getOtpExpiry(10);
    await OtpRepository.create(code, userId, type, expiresAt);
    await sendOtpEmail(user.email, code);

    return { message: "OTP sent successfully" };
  },

  verifyOtp: async (userId: number, code: string, type: string) => {
    const otp = await OtpRepository.findValid(userId, type);
    if (!otp) throw new Error("No valid OTP found");
    if (otp.code !== code) throw new Error("Invalid OTP code");

    await OtpRepository.markUsed(otp.id);
    return { message: "OTP verified successfully" };
  },
};