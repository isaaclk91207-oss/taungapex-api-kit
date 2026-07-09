import { Request, Response } from "express";
import { AuthRequest } from "../types";
import { AuthService } from "../services/auth.service";
import { validateRegister, validateLogin } from "../validators/auth.validator";

export const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const errors = validateRegister(req.body);
      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }
      const result = await AuthService.register(req.body);
      res.status(201).json({ success: true, message: "User registered successfully", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const errors = validateLogin(req.body);
      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }
      const result = await AuthService.login(req.body.email, req.body.password);
      res.status(200).json({ success: true, message: "Login successful", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  logout: async (req: AuthRequest, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ success: false, message: "Refresh token is required" });
        return;
      }
      await AuthService.logout(refreshToken);
      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ success: false, message: "Refresh token is required" });
        return;
      }
      const result = await AuthService.refresh(refreshToken);
      res.status(200).json({ success: true, message: "Token refreshed successfully", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getMe: async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
      }
      const result = await AuthService.getMe(req.user.userId);
      res.status(200).json({ success: true, message: "User profile retrieved", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};