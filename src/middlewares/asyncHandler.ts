import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError } from "zod";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { ApiError } from "../utils";
import { AsyncFn, ErrorFormatter, ErrorOptions } from "../types/error.type";

// Format Zod errors
const formatZodError = (zodError: ZodError) => {
  return zodError.issues?.reduce<Record<string, any>>(
    (acc: Record<string, any>, issue: any) => {
      const path = issue.path.join(".");
      acc[path] = issue.message;
      return acc;
    },
    {}
  );
};

// Default error formatting
const defaultErrorFormatter: ErrorFormatter = (
  error: unknown
): ErrorOptions => {
  if (error instanceof ZodError) {
    return {
      status: "fail",
      type: "ValidationError",
      code: 400,
      message: "Validation failed. Please correct the highlighted fields.",
      details: formatZodError(error),
    };
  } else if (error instanceof ApiError) {
    return {
      status: "fail",
      type: error.type,
      code: error.code,
      message: error.message,
      details: error?.details,
    };
  } else if (
    error instanceof JsonWebTokenError ||
    error instanceof TokenExpiredError ||
    error instanceof NotBeforeError
  ) {
    return {
      status: "fail",
      type: "AuthenticationError",
      code: 401,
      message: "You are not logged in.",
      details: null,
    };
  }
  return {
    status: "error",
    type: "InternalError",
    code: 500,
    message: "Something went wrong.",
  };
};

// Async handler wrapper
const asyncHandler =
  <T extends Request = Request>(
    fn: AsyncFn<T>,
    errorFormatter: ErrorFormatter = defaultErrorFormatter
  ): RequestHandler =>
  async (req, res: Response, next: NextFunction): Promise<any> => {
    try {
      await fn(req as T, res, next);
    } catch (error: any) {
      const { code, ...rest } = errorFormatter(error);

      if (code === 500) {
        console.log("Error: ", error);
      }

      return res.status(code).json({
        success: false,
        code,
        ...rest,
      });
    }
  };

export default asyncHandler;
