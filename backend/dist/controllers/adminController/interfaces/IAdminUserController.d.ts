import { Request, Response } from 'express';
export interface IAdminUserController {
    getUserStats(req: Request, res: Response): Promise<void>;
    getUsers(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=IAdminUserController.d.ts.map