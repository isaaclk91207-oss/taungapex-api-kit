import jwt from "jsonwebtoken";
import { config } from "../config";
import { JwtPayload } from "../types";

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload as object, config.jwt.secret, { expiresIn: config.jwt.expiresIn as any });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload as object, config.jwt.secret, { expiresIn: config.jwt.refreshExpiresIn as any });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
};
