import { Request, Response } from 'express';
import type { IAuthService } from '../../services/authServices/interfaces/IAuthService.js';
import type { IAuthController } from './interfaces/IAuthController.js';
import type { IOtpServices } from '../../services/authServices/interfaces/IOtpService.js';
import '../../config/container.js';
export declare class AuthController implements IAuthController {
    private _authService;
    private _otpService;
    constructor(authService: IAuthService, otpService: IOtpServices);
    signup(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    forgotPassword(req: Request, res: Response): Promise<void>;
    resetPassword(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=authController.d.ts.map