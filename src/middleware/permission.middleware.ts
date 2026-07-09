import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { UserRepository } from "../repositories/user.repository";
import { RoleRepository } from "../repositories/role.repository";

export const requirePermission = (module: string, action: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
      }

      const user = await UserRepository.findById(req.user.userId);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      const fullRole = await RoleRepository.findById(user.roleId);
      if (!fullRole) {
        res.status(403).json({ success: false, message: "Role not found" });
        return;
      }

      const hasPermission = fullRole.permissions.some(
        (p) => p.module === module && p.action === action
      );

      if (!hasPermission) {
        res.status(403).json({ success: false, message: "Insufficient permissions" });
        return;
      }

      next();
    } catch {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
};
