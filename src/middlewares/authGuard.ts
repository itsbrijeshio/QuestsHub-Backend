import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/error.type";
import { ApiError } from "../utils";
import asyncHandler from "./asyncHandler";
import { env } from "../config";

const authGuard: any = asyncHandler(async (req: AuthRequest, res, next) => {
  const token = req.headers?.["x-access-token"]?.toString();
  const accessToken = req.cookies?.["accessToken"] || token?.split(" ")[1];

  if (!accessToken) {
    throw new ApiError({
      type: "AuthenticationError",
      code: 401,
      message: "You are not logged in.",
    });
  }

  const decoded: any = jwt.verify(accessToken, env.JWT_SECRET);
  req.auth = { _id: decoded._id, role: decoded.role };

  if (!req.auth?._id) {
    throw new ApiError({
      type: "AuthenticationError",
      code: 401,
      message: "You are not logged in.",
    });
  }
  next();
});

const roleGuard = (roles: string[]) =>
  asyncHandler(async (req: AuthRequest, res, next) => {
    const role = req.auth?.role || "";
    if (!roles.includes(role)) {
      throw new ApiError({
        type: "ForbiddenError",
        code: 403,
        message: "You are not authorized to perform this action.",
      });
    }
    next();
  });

authGuard.roleGuard = roleGuard;

export default authGuard;
