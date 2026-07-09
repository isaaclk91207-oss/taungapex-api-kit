import { AuthRequest } from "../types";
import { Response } from "express";
import { OtpService } from "../services/otp.service";
import { validateSendOtp, validateVerifyOtp } from "../validators/auth.validator";

export const OtpController = {
  sendOtp: async (req: AuthRequest, res: Response) => {
    try {
      const errors = validateSendOtp(req.body);
      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }
      if (!req.user) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
      }
      const result = await OtpService.sendOtp(req.user.userId, req.body.type);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  verifyOtp: async (req: AuthRequest, res: Response) => {
    try {
      const errors = validateVerifyOtp(req.body);
      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }
      if (!req.user) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
      }
      const result = await OtpService.verifyOtp(req.user.userId, req.body.code, req.body.type);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};