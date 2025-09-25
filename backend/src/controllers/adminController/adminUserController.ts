import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import "../../config/container.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { jwtService } from "../../utils/jwt.js";
import { IAdminUserController } from "./interfaces/IAdminUserController.js";
import type { IAdminUserServices } from "../../services/adminServices/interfaces/IAdminUserServices.js";

@injectable()
export class AdminUserController implements IAdminUserController {

    private _adminUserService:IAdminUserServices
    constructor(@inject("IAdminUserServices") adminUserService:IAdminUserServices){
        this._adminUserService=adminUserService
    }

    getUserStats(req: Request, res: Response): Promise<void> {
        console.log("Admin User Service is running")
        console.log(req.body)
        return Promise.resolve()
    }



}
