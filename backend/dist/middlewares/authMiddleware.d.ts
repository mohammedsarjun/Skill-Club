import { Request, Response, NextFunction } from "express";
declare module "express-serve-static-core" {
    interface Request {
        user?: {
            userId: string;
            roles: string[];
        };
    }
}
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function roleGuard(requiredRole: string): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authMiddleware.d.ts.map