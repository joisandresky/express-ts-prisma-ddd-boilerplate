import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../../infrastructure/errors/response_error";

export const error_middlewre = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error,
      message: "Validation Error!",
      success: false,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      message: error.message,
      errors: error.error_detail ?? undefined,
      success: false,
    });
  } else {
    res.status(500).json({
      errors: error.message,
      message: "Internal Server Error!",
      success: false,
    });
  }
};
