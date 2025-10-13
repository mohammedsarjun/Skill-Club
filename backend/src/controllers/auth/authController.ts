import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import type { IAuthService } from '../../services/authServices/interfaces/IAuthService.js';
import type { IAuthController } from './interfaces/IAuthController.js';
import type { IOtpServices } from '../../services/authServices/interfaces/IOtpService.js';
import { GetUserDto } from '../../dto/authDTO/auth.dto.js';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { UserDto } from '../../dto/userDTO/user.dto.js';
import { jwtService } from '../../utils/jwt.js';
import { jwtConfig } from '../../config/jwt.config.js';
import { MESSAGES } from '../../contants/contants.js';

@injectable()
export class AuthController implements IAuthController {
  private _authService: IAuthService;
  private _otpService: IOtpServices;
  constructor(
    @inject('IAuthService') authService: IAuthService,
    @inject('IOtpServices') otpService: IOtpServices,
  ) {
    this._authService = authService;
    this._otpService = otpService;
  }
  async signup(req: Request, res: Response): Promise<void> {
 
      const user: GetUserDto = await this._authService.signup(req.body);
      console.log('successfully created');
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: MESSAGES.USER.CREATED,
        data: user,
      });

  }

  async login(req: Request, res: Response): Promise<void> {
      const user: UserDto = await this._authService.login(req.body);

      // Generate JWT token
      // 🔹 Create tokens
      const payload = user;
      const accessToken = jwtService.createToken(payload, jwtConfig.accessTokenMaxAge);
      const refreshToken = jwtService.createToken(payload, jwtConfig.refreshTokenMaxAge);

      res.cookie('accessToken', accessToken, {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
        sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
        maxAge: jwtConfig.accessTokenMaxAge * 1000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: jwtConfig.refreshTokenMaxAge,
      });

      res.status(HttpStatus.OK).json({
        message: MESSAGES.AUTH.LOGIN_SUCCESS,
        success: true,
        data: user,
      });
  
  }

  async logout(req: Request, res: Response): Promise<void> {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as
          | 'none'
          | 'lax'
          | 'strict',
        path: '/',
      };

      // Clear both cookies
      res.clearCookie('accessToken', cookieOptions);
      res.clearCookie('refreshToken', cookieOptions);

      res.status(HttpStatus.OK).json({ message: MESSAGES.AUTH.LOGOUT_SUCCESS });
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
      const { email } = req.body;
      const user = await this._authService.forgotPassword(email);
      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.AUTH.RESET_LINK_SENT,
        data: user,
      });

  }

  async resetPassword(req: Request, res: Response): Promise<void> {
      const { token, password } = req.body.resetData;

      const user = await this._authService.resetPassword(token, password);
      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.AUTH.PASSWORD_CHANGED,
        data: user,
      });

  }

  async verifyPassword(req: Request, res: Response): Promise<void> {
      const userId = req.user?.userId;
      const { password } = req.body;

      await this._authService.verifyPassword(userId as string, password);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.AUTH.PASSWORD_VERIFIED,
      });

  }

  async createActionVerification(req: Request, res: Response): Promise<void> {

      const userId = req.user?.userId;
      const { password } = req.body;

      await this._authService.verifyPassword(userId as string, password);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.AUTH.PASSWORD_VERIFIED,
      });

  }
}
