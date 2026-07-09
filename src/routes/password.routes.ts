import { Router } from "express";
import { PasswordController } from "../controllers/password.controller";

const router = Router();

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags: [Password]
 *     summary: Request password reset OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent to your email
 *       400:
 *         description: Email not found
 */
router.post("/forgot-password", PasswordController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags: [Password]
 *     summary: Reset password with OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code, newPassword]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid OTP or validation error
 */
router.post("/reset-password", PasswordController.resetPassword);

export default router;
