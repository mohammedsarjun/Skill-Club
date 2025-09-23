import { Request, Response } from "express";
import { IGoogleAuthController } from "./interfaces/IGoogleAuthController.js";
import type { IGoogleAuthService } from "../../services/authServices/interfaces/IGoogleAuthService.js";
export declare class GoogleAuthController implements IGoogleAuthController {
    private googleAuthService;
    constructor(googleAuthService: IGoogleAuthService);
    googleLogin(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=googleAuthController.d.ts.map