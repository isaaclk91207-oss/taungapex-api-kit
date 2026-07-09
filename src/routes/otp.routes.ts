import { Router } from "express";
import { OtpController } from "../controllers/otp.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     tags: [OTP]
 *     summary: Send OTP to email
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [login, reset_password, verify_email]
 *                 example: verify_email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authenticated
 */
router.post("/send-otp", authMiddleware, OtpController.sendOtp);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     tags: [OTP]
 *     summary: Verify OTP code
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, type]
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *               type:
 *                 type: string
 *                 enum: [login, reset_password, verify_email]
 *                 example: verify_email
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *       401:
 *         description: Not authenticated
 */
router.post("/verify-otp", authMiddleware, OtpController.verifyOtp);

export default router;
