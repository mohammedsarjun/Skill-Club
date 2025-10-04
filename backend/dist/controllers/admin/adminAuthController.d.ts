import { Request, Response } from 'express';
import { IAdminAuthController } from './interfaces/IAdminAuthController.js';
import '../../config/container.js';
import type { IAdminAuthServices } from '../../services/adminServices/interfaces/IAdminAuthServices.js';
export declare class AdminAuthController implements IAdminAuthController {
    private adminAuthServices;
    constructor(adminAuthServices: IAdminAuthServices);
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    me(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=adminAuthController.d.ts.map