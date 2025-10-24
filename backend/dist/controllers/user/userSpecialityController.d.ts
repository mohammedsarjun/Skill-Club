import { Request, Response } from 'express';
import '../../config/container.js';
import { IUserSpecialityController } from './interfaces/IUserSpecialityController.js';
import type { IUserSpecialityServices } from '../../services/userServices/interfaces/IUserSpecialityServices.js';
export declare class UserSpecialityController implements IUserSpecialityController {
  private _userSpecialityService;
  constructor(userSpecialityService: IUserSpecialityServices);
  getSpecialities(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=userSpecialityController.d.ts.map
