import { Request, Response } from 'express';
import { IGoogleAuthController } from './interfaces/IGoogleAuthController.js';
import type { IGoogleAuthService } from '../../services/authServices/interfaces/IGoogleAuthService.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';
export declare class GoogleAuthController implements IGoogleAuthController {
    private _googleAuthService;
    private _userService;
    constructor(googleAuthService: IGoogleAuthService, userService: IUserServices);
    googleLogin(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=googleAuthController.d.ts.map