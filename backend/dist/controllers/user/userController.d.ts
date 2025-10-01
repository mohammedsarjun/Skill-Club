import { Request, Response } from 'express';
import '../../config/container.js';
import { IUserController } from './interfaces/IUserController.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';
export declare class UserController implements IUserController {
    private userService;
    constructor(userService: IUserServices);
    selectRole(req: Request, res: Response): Promise<void>;
    me(req: Request, res: Response): Promise<void>;
    createFreelancerProfile(req: Request, res: Response): Promise<void>;
    createClientProfile(req: Request, res: Response): Promise<void>;
    switchRole(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=userController.d.ts.map