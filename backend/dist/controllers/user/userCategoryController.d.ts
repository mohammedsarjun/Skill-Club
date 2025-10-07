import { Request, Response } from 'express';
import '../../config/container.js';
import type { IUserCategoryController } from './interfaces/IUserCategoryController.js';
import type { IUserCategoryServices } from '../../services/userServices/interfaces/IUserCategoryService.js';
export declare class UserCategoryController implements IUserCategoryController {
    private _userCategoryService;
    constructor(userCategoryService: IUserCategoryServices);
    getAllCategory(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=userCategoryController.d.ts.map