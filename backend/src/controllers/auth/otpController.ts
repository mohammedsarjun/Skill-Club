import { inject, injectable } from 'tsyringe';
import { IOtpController } from './interfaces/IOtpController.js';
import { Request, Response } from 'express';
import type { IOtpServices } from '../../services/authServices/interfaces/IOtpService.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';
import { jwtService } from '../../utils/jwt.js';

@injectable()
export class OtpController implements IOtpController {
  private otpServices: IOtpServices;
  private userServices: IUserServices;
  constructor(
    @inject('IOtpServices') otpService: IOtpServices,
    @inject('IUserServices') userServices: IUserServices,
  ) {
    this.otpServices = otpService;
    this.userServices = userServices;
  }
  async createOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, purpose } = req.body;

      const otpResponse = await this.otpServices.createOtp(email, purpose);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Otp Sent Successfully',
        data: otpResponse,
        purpose,
      });
      console.log('success');
    } catch (error: any) {
      throw error;
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp, userId } = req.body;
      const response = await this.otpServices.verifyOtp(email, otp);

      switch (response.purpose) {
        case 'signup':
          await this.userServices.markUserVerified(userId);

          // 🔹 Create tokens
          const payload = {
            userId: userId,
            roles: null,
            activeRole: null,
            isOnboardingCompleted: false,
            clientProfile:null,
            freelancerProfile:null
          };
          const accessToken = jwtService.createToken(payload, '15m');
          const refreshToken = jwtService.createToken(payload, '7d');

          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure:  process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
            sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
            maxAge: 15 * 60 * 1000,
          });

          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure:  process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          break;
        case 'forgotPassword':
          // maybe return a token or flag to allow password reset
          // await otpService.markOtpUsed(otpRecord.email);
          break;
        default:
          throw new Error('Unknown OTP purpose');
      }

      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Otp Verfied Successfully',
        data: response,
      });
    } catch (error: any) {
      throw error;
    }
  }
}
