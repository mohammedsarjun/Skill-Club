import { Request,Response } from "express";
import { IAuthService } from "../../services/authServices/interfaces/IAuthService.js";
export class AuthController{
    private authService:IAuthService
    constructor(authService:IAuthService){
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