import { ErrorOptions, ErrorType } from "../types/error.type";

class ApiError extends Error {
  public code: number;
  public type: ErrorType;
  public details?: any;

  constructor(options: ErrorOptions) {
    super(options.message);
    this.code = options.code;
    this.type = options.type;
    this.details = options.details;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
