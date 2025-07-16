import { Response } from "express";
import { HTTPCode } from "../types/error.type";

const response = (
  res: Response,
  code: HTTPCode,
  data: any = {},
  rest?: any
) => {
  const message = data?.message || "Success";
  delete data?.message;
  
  return res.status(code).json({
    success: true,
    status: "success",
    code,
    message,
    data,
    ...rest,
  });
};


export default response