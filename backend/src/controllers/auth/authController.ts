import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import type { IAuthService } from "../../services/authServices/interfaces/IAuthService.js";
import type { IAuthController } from "./interfaces/IAuthController.js";
import "../../config/container.js"
@injectable()
export class AuthController implements IAuthController {
    private authService: IAuthService
    constructor(@inject("IAuthService") authService: IAuthService) {
        this.authService = authService
    }
    async signup(req: Request, res: Response):Promise<void> {
        try {
            const { firstName, lastName, email, phone, password, agreement } = req.body

            const user = await this.authService.signup({ firstName, lastName, email, phone, password, agreement })

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}