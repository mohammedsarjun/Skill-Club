import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";

export const validate = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)

      req.body = schema.parse(req.body);
            
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: err.issues.map(e => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      next(err);
    }
  };
