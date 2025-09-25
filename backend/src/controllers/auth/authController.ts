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
import { UserDto } from "../../dto/userDTO/user.dto.js";
import { jwtService } from "../../utils/jwt.js";

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
      const user: GetUserDto = await this.authService.signup(req.body);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      throw error

    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const user: UserDto = await this.authService.login(req.body);


      // Generate JWT token
      // 🔹 Create tokens
      const payload = user;
      const accessToken = jwtService.createToken(payload, "15m");
      const refreshToken = jwtService.createToken(payload, "7d");

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,       // 🔹 must be false on localhost (no HTTPS)
        sameSite: "lax",     // 🔹 "strict" blocks cross-site cookies
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatus.OK).json({
        success: true,
        message: "User Logged In successfully",
        data: user,
      });
    } catch (error: any) {
      throw error

    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body
      const user = await this.authService.forgotPassword(email);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Reset link sent to your email.",
        data: user,
      });
    } catch (error: any) {
      throw error

    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token,password } = req.body.resetData

      const user = await this.authService.resetPassword(token,password);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Password Changed Successfully.",
        data: user,
      });
    } catch (error: any) {
      throw error

    }
  }


}
