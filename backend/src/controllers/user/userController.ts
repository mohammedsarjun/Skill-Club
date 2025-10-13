import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IUserController } from './interfaces/IUserController.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';

import { jwtService } from '../../utils/jwt.js';
import { mapClientDtoToUserModel, mapFreelancerDtoToUserModel } from '../../mapper/user.mapper.js';
import { MESSAGES } from '../../contants/contants.js';
@injectable()
export class UserController implements IUserController {
  private _userService: IUserServices;

  constructor(@inject('IUserServices') userService: IUserServices) {
    this._userService = userService;
  }
  async selectRole(req: Request, res: Response): Promise<void> {
    const { role } = req.body;
    const userId = req.user?.userId;
    const user = await this._userService.selectRole(userId, role);
    // Issue new JWT with updated roles
    const payload = user;
    const accessToken = jwtService.createToken(payload, '15m');
    const refreshToken = jwtService.createToken(payload, '7d');

    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.ROLE_SELECTED,
      data: user,
    });
  }

  async me(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const user = await this._userService.me(userId!);
    const payload = user;
    const accessToken = jwtService.createToken(payload, '15m');

    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
      sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
      maxAge: 15 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.VERIFIED,
      data: user,
    });
  }

  async createFreelancerProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;

    const user = await this._userService.createFreelancerProfile(userId, req.body);

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.Freelancer.UPDATED,
      data: user,
    });
  }

  async createClientProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;

    const user = await this._userService.createClientProfile(userId, req.body);

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.CLIENT.UPDATED,
      data: user,
    });
  }

  async switchRole(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const user = await this._userService.switchRole(userId);
    const payload = user;
    const accessToken = jwtService.createToken(payload, '15m');
    const refreshToken = jwtService.createToken(payload, '7d');
    res.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
      sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.ROLE_SWITCHED,
      data: user,
    });
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const user = await this._userService.getProfile(userId as string);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.USER.FETCH_SUCCESS,
      data: user,
    });
  }

  async getAddress(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const user = await this._userService.getAddress(userId as string);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User Address Fetched Successfully',
      data: user,
    });
  }

  async createActionVerification(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const { actionType, actionData } = req.body;
    const user = await this._userService.createActionVerification(
      userId as string,
      actionType,
      actionData,
    );
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User Address Fetched Successfully',
      data: user,
    });
  }
}
