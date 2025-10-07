import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IUserController } from './interfaces/IUserController.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';

import { jwtService } from '../../utils/jwt.js';
import {
  mapClientDtoToUserModel,
  mapFreelancerDtoToUserModel,
} from '../../mapper/userMapper/user.mapper.js';
import { MESSAGES } from '../../contants/contants.js';
@injectable()
export class UserController implements IUserController {
  private _userService: IUserServices;

  constructor(@inject('IUserServices') userService: IUserServices) {
    this._userService = userService;
  }
  async selectRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body;
      const userId = req.user?.userId;
      const user = await this._userService.selectRole(userId, role);
      // Issue new JWT with updated roles
      const payload = user;
      const accessToken = jwtService.createToken(payload, '15m');
      const refreshToken = jwtService.createToken(payload, '7d');

      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER.ROLE_SELECTED,
        data: user,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const user = await this._userService.me(userId!);
      const payload = user;
      const accessToken = jwtService.createToken(payload, '15m');


      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure:  process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
        sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
        maxAge: 15 * 60 * 1000,
      });

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER.VERIFIED,
        data: user,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async createFreelancerProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const dto=mapFreelancerDtoToUserModel(req.body)
      const user = await this._userService.createFreelancerProfile(userId, dto);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.Freelancer.UPDATED,
        data: user,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async createClientProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const dto = mapClientDtoToUserModel(req.body);
      const user = await this._userService.createClientProfile(userId, dto);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.CLIENT.UPDATED,
        data: user,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async switchRole(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const user = await this._userService.switchRole(userId);
      const payload = user;
      const accessToken = jwtService.createToken(payload, '15m');
      const refreshToken = jwtService.createToken(payload, '7d');
      console.log(user)
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

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER.ROLE_SWITCHED,
        data: user,
      });
    } catch (error: unknown) {
      throw error;
    }
  }
}
