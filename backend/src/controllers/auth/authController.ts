import { Request,Response } from "express";
import { injectable, inject } from "tsyringe";
import type { IAuthService } from "../../services/authServices/interfaces/IAuthService.js";
import "../../config/container.js"
@injectable()
export class AuthController{
    private authService:IAuthService
    constructor(@inject("IAuthService") authService:IAuthService){
        this.authService=authService
    }
    async signup(req:Request,res:Response){
        try{
            const {firstName,lastName,email,phone,password,agreement} = req.body

            const user=this.authService.signup({firstName,lastName,email,phone,password,agreement})
        }catch(error:any){
                  res.status(400).json({ message: error.message });
        }
    }
}