import { Request } from "express";

export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}
export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}
export type OtpType = "login" | "reset_password" | "verify_email";
