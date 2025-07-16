import { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

const day = 24 * 60 * 60 * 1000;

const signCookie = (
  res: Response,
  secret: { _id: string; role: string }
): string => {
  const token = jwt.sign(secret, env.JWT_SECRET, {
    expiresIn: parseInt(env.JWT_EXPIRES_IN as string) * day,
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: parseInt(env.JWT_EXPIRES_IN as string) * day,
  });
  return token;
};

export default signCookie;
