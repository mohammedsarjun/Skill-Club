import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import "../../config/container.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { IUserController } from "./interfaces/IUserController.js";
import type { IUserServices } from "../../services/userServices/interfaces/IUserServices.js";
import { UserDto } from "../../dto/userDTO/user.dto.js";
import { jwtService } from "../../utils/jwt.js";
import { mapUserModelToUserDto } from "../../mapper/userMapper/user.mapper.js";
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
            const payload = user;
            const accessToken = jwtService.createToken(payload, "15m");
            const refreshToken = jwtService.createToken(payload, "7d");

            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

           console.log(user)
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Role Selected Successfully",
                data: user,
            });
        } catch (error: any) {
            throw error
        }
    }

        me(req: Request, res: Response): void {
        try {  
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Role Selected Successfully",
                data:req.user
            });
        } catch (error: any) {
            throw error

        }
    }

    createFreelancerProfile(req:Request,res:Response):void{
        try {
            const userId=req.user?.userId
            const user = this.userService.createFreelancerProfile(userId,req.body)
           
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Freelancer Profile Updated Successfully",
                data: user,
            });
        } catch (error: any) {
            throw error
        }
    }
}
