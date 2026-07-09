import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }

  try {
    const token = header.split(" ")[1];
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
