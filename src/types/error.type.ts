import { NextFunction, Request, Response } from "express";

// ================ Error Status ================================ //
export type Status = "success" | "fail" | "error";

// ================ Error Types ================================ //
export type ErrorType =
  | "ValidationError"
  | "AuthenticationError"
  | "AuthorizationError"
  | "NotFoundError"
  | "ConflictError"
  | "RateLimitError"
  | "InternalError"
  | "DatabaseError"
  | "ThirdPartyError"
  | "ForbiddenError";

// =============== HTTP Status Codes ================================ //
export enum HTTPCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// =============== Error Options  ================================ //
export type ErrorOptions = {
  status?: Status;
  type: ErrorType;
  code: HTTPCode;
  message: string;
  details?: any;
};

// ================ Auth Request ================================ //
export interface AuthRequest
  extends Request<any, any, any, any, Record<string, any>> {
  auth: {
    _id: string;
    role?: string;
  };
  temp?: any;
}

export type ErrorFormatter = (error: unknown) => ErrorOptions;

// ================ Async Handler ================================ //
export type AsyncFn<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>;
