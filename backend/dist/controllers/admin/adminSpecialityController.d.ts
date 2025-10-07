import { Request, Response } from 'express';
import type { IAdminSpecialityController } from './interfaces/IAdminSpecialityController.js';
import type { IAdminSpecialityServices } from '../../services/adminServices/interfaces/IAdminSpecialityServices.js';
import '../../config/container.js';
export declare class AdminSpecialityController implements IAdminSpecialityController {
    private _adminSpecialityService;
    constructor(adminSpecialityService: IAdminSpecialityServices);
    addSpeciality(req: Request, res: Response): Promise<void>;
    editSpeciality(req: Request, res: Response): Promise<void>;
    getAllSpeciality(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=adminSpecialityController.d.ts.map