import { Request, Response } from "express";
export interface IAdminAuthController {
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=IAdminAuthController.d.ts.map