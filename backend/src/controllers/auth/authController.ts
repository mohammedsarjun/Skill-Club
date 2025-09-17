import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import type { IAuthService } from "../../services/authServices/interfaces/IAuthService.js";
import type { IAuthController } from "./interfaces/IAuthController.js";
import type { IOtpServices } from "../../services/authServices/interfaces/IOtpService.js";
import bcrypt from "bcryptjs";
import { OtpService } from "../../services/authServices/otpServices.js";
import { createOtpDigit } from "../../utils/otpGenerator.js";
import { mapCreateUserDtoToUserModel } from "../../mapper/authMapper/auth.mapper.js";
import { CreateUserDTO } from "../../dto/authDTO/auth.dto.js";
import "../../config/container.js";
@injectable()
export class AuthController implements IAuthController {
  private authService: IAuthService;
  private otpService:IOtpServices
  constructor(@inject("IAuthService") authService: IAuthService,@inject("IOtpServices") otpService:IOtpServices) {
    this.authService = authService;
    this.otpService=otpService
  }
  async signup(req: Request, res: Response): Promise<void> {
    try {
      let { firstName, lastName, email, phone, password, agreement } =
        req.body;

        const dto = mapCreateUserDtoToUserModel(req.body)



        dto.password= await bcrypt.hash(dto.password,10)

      const user = await this.authService.signup(dto);


      const otp=await createOtpDigit()

     const otpRespose=await this.otpService.createOtp(email,otp)
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          email: otpRespose?.email,
          expiresAt:otpRespose?.expiresAt
        },
      });
    } catch (error: any) {
      throw error

    }
  }
}
