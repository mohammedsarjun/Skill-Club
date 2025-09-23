import { Request, Response } from "express";
import { IGoogleAuthController } from "./interfaces/IGoogleAuthController.js";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { injectable,inject } from "tsyringe";
import type { IGoogleAuthService } from "../../services/authServices/interfaces/IGoogleAuthService.js";

@injectable()
export class GoogleAuthController implements IGoogleAuthController {

    private googleAuthService:IGoogleAuthService
    constructor(@inject("IGoogleAuthService") googleAuthService:IGoogleAuthService) {
        this.googleAuthService=googleAuthService

    }

    async googleLogin(req: Request, res: Response): Promise<void> {
    const { idToken } = req.body;

    if (!idToken) throw new AppError("Token missing",HttpStatus.BAD_REQUEST)

    try {
        const result = await this.googleAuthService.verifyToken(idToken);
        res.json(result);
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
    }


}
