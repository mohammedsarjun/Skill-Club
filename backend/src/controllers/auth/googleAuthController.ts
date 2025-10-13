import { Request, Response } from 'express';
import { IGoogleAuthController } from './interfaces/IGoogleAuthController.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { injectable, inject } from 'tsyringe';
import type { IGoogleAuthService } from '../../services/authServices/interfaces/IGoogleAuthService.js';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import dotenv from 'dotenv';
import { jwtService } from '../../utils/jwt.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';
import { UserDto } from '../../dto/userDTO/user.dto.js';
import { jwtConfig } from '../../config/jwt.config.js';
import { MESSAGES } from '../../contants/contants.js';
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
  
      const { idToken } = req.body;

      const user:UserDto = await this._googleAuthService.verifyToken(idToken);
      await this._userService.markUserVerified(user.userId);

      // 🔹 Create tokens
      const payload = user;
      const accessToken = jwtService.createToken(payload, jwtConfig.accessTokenMaxAge);
      const refreshToken = jwtService.createToken(payload, jwtConfig.refreshTokenMaxAge);

      res.cookie('accessToken', accessToken, {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
        sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
        maxAge: jwtConfig.accessTokenMaxAge*1000
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: jwtConfig.refreshTokenMaxAge*1000
      });

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.AUTH.LOGIN_SUCCESS,
        data: user,
      });

  }
}
