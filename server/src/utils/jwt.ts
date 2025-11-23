import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";
import { config } from "../config/env";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

if (!config.jwtSecret) {
  throw new Error("JWT secret is not defined in env config");
}

export const generateToken = (payload: JWTPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwtExpire as StringValue,
  };

  return jwt.sign(payload, config.jwtSecret as jwt.Secret, options);
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwtSecret as jwt.Secret) as JWTPayload;
};
