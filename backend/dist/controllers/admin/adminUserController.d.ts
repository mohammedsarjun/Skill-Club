import { Request, Response } from 'express';
import '../../config/container.js';
import { IAdminUserController } from './interfaces/IAdminUserController.js';
import type { IAdminUserServices } from '../../services/adminServices/interfaces/IAdminUserServices.js';
export declare class AdminUserController implements IAdminUserController {
  private _adminUserService;
  constructor(adminUserService: IAdminUserServices);
  getUserStats(req: Request, res: Response): Promise<void>;
  getUsers(req: Request, res: Response): Promise<void>;
  getUserDetail(req: Request, res: Response): Promise<void>;
  updateUserStatus(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=adminUserController.d.ts.map
