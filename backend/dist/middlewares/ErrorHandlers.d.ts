import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
export declare const errorHandler: (err: Error | AppError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=ErrorHandlers.d.ts.map