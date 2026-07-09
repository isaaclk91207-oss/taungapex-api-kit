import nodemailer from "nodemailer";
import { config } from "../config";

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendOtpEmail = async (to: string, code: string): Promise<void> => {
  await transporter.sendMail({
    from: config.smtp.user,
    to,
    subject: "TaungApex - Your OTP Code",
    html: `<p>Your OTP code is: <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`,
  });
};
