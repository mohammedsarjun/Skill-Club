import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAdminAuthController } from './interfaces/IAdminAuthController.js';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import type { IAdminAuthServices } from '../../services/adminServices/interfaces/IAdminAuthServices.js';
import { jwtService } from '../../utils/jwt.js';

@injectable()
export class AdminAuthController implements IAdminAuthController {
  private adminAuthServices: IAdminAuthServices;

  constructor(
    @inject('IAdminAuthServices')
    adminAuthServices: IAdminAuthServices,
  ) {
    this.adminAuthServices = adminAuthServices;
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = this.adminAuthServices.login(req.body);

      // 🔹 Create tokens
      const payload = { userId: 'admin_1', roles: ['admin'], activeRole: 'admin' };
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
        message: 'Admin Logged In Successfully',
        data: payload,
      });
    } catch (error) {
      throw error;
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
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

      // Double insurance: explicitly overwrite with expired values
      res.cookie('accessToken', '', { ...cookieOptions, expires: new Date(0) });
      res.cookie('refreshToken', '', { ...cookieOptions, expires: new Date(0) });

      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      throw err;
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Admin Verified',
        data: req.user,
      });
    } catch (error: any) {
      throw error;
    }
  }
}
