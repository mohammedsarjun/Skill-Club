import { Request, Response } from 'express';
import '../../config/container.js';
import { IUserSkillController } from './interfaces/IUserSkillController.js';
import type { IUserSkillServices } from '../../services/userServices/interfaces/IUserSkillService.js';
export declare class UserSkillController implements IUserSkillController {
    private _userSkillService;
    constructor(userSkillService: IUserSkillServices);
    getSuggestedSkills(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=userSkillController.d.ts.map