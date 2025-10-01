import { Request, Response } from 'express';
import { IGoogleAuthController } from './interfaces/IGoogleAuthController.js';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { injectable, inject } from 'tsyringe';
import type { IGoogleAuthService } from '../../services/authServices/interfaces/IGoogleAuthService.js';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import dotenv from 'dotenv';
import { jwtService } from '../../utils/jwt.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';
dotenv.config();

@injectable()
export class GoogleAuthController implements IGoogleAuthController {
  private _googleAuthService: IGoogleAuthService;
  private _userService: IUserServices;
  constructor(
    @inject('IGoogleAuthService') googleAuthService: IGoogleAuthService,
    @inject('IUserServices') userService: IUserServices,
  ) {
    this._googleAuthService = googleAuthService;
    this._userService = userService;
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { idToken } = req.body;

      const user = await this._googleAuthService.verifyToken(idToken);
      await this._userService.markUserVerified(user._id);

      // 🔹 Create tokens
      const payload = {
        userId: user._id,
        roles: null,
        activeRole: null,
        isOnboardingCompleted: false,
        clientProfile: null,
        freelancerProfile: null,
      };
      const accessToken = jwtService.createToken(payload, '15m');
      const refreshToken = jwtService.createToken(payload, '7d');

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false, // 🔹 must be false on localhost (no HTTPS)
        sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatus.OK).json({
        success: true,
        message: 'User Logged In successfully',
        data: user,
      });
    } catch (error: any) {
      throw error;
    }
  }
}
