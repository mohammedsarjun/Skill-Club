import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import type { IAuthService } from "../../services/authServices/interfaces/IAuthService.js";
import type { IAuthController } from "./interfaces/IAuthController.js";
import type { IOtpServices } from "../../services/authServices/interfaces/IOtpService.js";
import bcrypt from "bcryptjs";
import { createOtpDigit } from "../../utils/otpGenerator.js";
import { mapCreateUserDtoToUserModel } from "../../mapper/authMapper/auth.mapper.js";
import { CreateUserDTO, GetUserDto } from "../../dto/authDTO/auth.dto.js";
import "../../config/container.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
@injectable()
export class AuthController implements IAuthController {
  private authService: IAuthService;
  private otpService: IOtpServices
  constructor(@inject("IAuthService") authService: IAuthService, @inject("IOtpServices") otpService: IOtpServices) {
    this.authService = authService;
    this.otpService = otpService
  }
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const user:GetUserDto = await this.authService.signup(req.body);
      console.log(user)
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      throw error

    }
  }
}
