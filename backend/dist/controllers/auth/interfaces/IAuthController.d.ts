import { Request, Response } from "express";
export interface IAuthController {
    signup(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=IAuthController.d.ts.map