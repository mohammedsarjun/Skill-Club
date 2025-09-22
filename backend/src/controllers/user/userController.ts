import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import "../../config/container.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { IUserController } from "./interfaces/IUserController.js";
import type { IUserServices } from "../../services/userServices/interfaces/IUserServices.js";
import { SelectRoleDto } from "../../dto/userDTO/user.dto.js";
import { jwtService } from "../../utils/jwt.js";
@injectable()
export class UserController implements IUserController {

    private userService: IUserServices

    constructor(@inject("IUserServices") userService: IUserServices) {
        this.userService = userService
    }
    async selectRole(req: Request, res: Response): Promise<void> {
        try {
            const { role } = req.body;
            const userId = req.user?.userId;
            const user = await this.userService.selectRole(userId, role)
            // Issue new JWT with updated roles
            const payload = { userId: user.userId, roles: user.roles };
            const accessToken = jwtService.createToken(payload, "15m");
            const refreshToken = jwtService.createToken(payload, "7d");

            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Role Selected Successfully",
                data: user.roles,
            });
        } catch (error: any) {
            throw error

        }
    }
}
