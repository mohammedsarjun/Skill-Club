// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err);


  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // For unexpected errors
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
    error: err.message,
  });
};