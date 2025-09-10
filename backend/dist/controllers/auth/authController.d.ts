import { Request, Response } from "express";
import type { IAuthService } from "../../services/authServices/interfaces/IAuthService.js";
import type { IAuthController } from "./interfaces/IAuthController.js";
import "../../config/container.js";
export declare class AuthController implements IAuthController {
    private authService;
    constructor(authService: IAuthService);
    signup(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=authController.d.ts.map