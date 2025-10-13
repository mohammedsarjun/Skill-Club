// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import { appLogger } from "../utils/logger.js";
import { HttpStatus } from "../enums/http-status.enum.js";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  appLogger.error("❌ Error:", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // For unexpected errors
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong on the server.",
    error: err.message,
  });
};
