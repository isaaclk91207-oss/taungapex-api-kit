import { Request, Response } from "express";
import { PasswordService } from "../services/password.service";
import { validateForgotPassword, validateResetPassword } from "../validators/auth.validator";

export const PasswordController = {
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const errors = validateForgotPassword(req.body);
      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }
      const result = await PasswordService.forgotPassword(req.body.email);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const errors = validateResetPassword(req.body);
      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }
      const { email, code, newPassword } = req.body;
      const result = await PasswordService.resetPassword(email, code, newPassword);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};