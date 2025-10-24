import { Request, Response } from 'express';
import { IAdminSkillController } from './interfaces/IAdminSkillController.js';
import '../../config/container.js';
import type { IAdminSkillServices } from '../../services/adminServices/interfaces/IAdminSkillServices.js';
export declare class AdminSkillController implements IAdminSkillController {
  private _adminSkillServices;
  constructor(adminSkillServices: IAdminSkillServices);
  addSkill(req: Request, res: Response): Promise<void>;
  getSkills(req: Request, res: Response): Promise<void>;
  editSkill(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=adminSkillController.d.ts.map
