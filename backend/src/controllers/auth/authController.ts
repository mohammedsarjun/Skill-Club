import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import type { IAuthService } from "../../services/authServices/interfaces/IAuthService.js";
import type { IAuthController } from "./interfaces/IAuthController.js";
import type { IOtpServices } from "../../services/authServices/interfaces/IOtpService.js";
import bcrypt from "bcryptjs";
import { OtpService } from "../../services/authServices/otpServices.js";
import { createOtpDigit } from "../../utils/otpGenerator.js";
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

        password= await bcrypt.hash(password,10)

      const user = await this.authService.signup({
        firstName,
        lastName,
        email,
        phone,
        password,
        agreement,
      });


      const otp=await createOtpDigit()

      await this.otpService.createOtp(email,otp)
      

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
