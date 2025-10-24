import { Request, Response } from 'express';
import type { IAdminCategoryController } from './interfaces/IAdminCategoryController.js';
import type { IAdminCategoryServices } from '../../services/adminServices/interfaces/IAdminCategoryServices.js';
import '../../config/container.js';
export declare class AdminCategoryController implements IAdminCategoryController {
  private adminCategoryService;
  constructor(adminCategoryService: IAdminCategoryServices);
  addCategory(req: Request, res: Response): Promise<void>;
  editCategory(req: Request, res: Response): Promise<void>;
  listOrUnlistCategory(req: Request, res: Response): Promise<void>;
  findCategoryById(req: Request, res: Response): Promise<void>;
  getAllCategory(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=adminCategoryController.d.ts.map
