import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IAdminUserController } from './interfaces/IAdminUserController.js';
import type { IAdminUserServices } from '../../services/adminServices/interfaces/IAdminUserServices.js';
import { AdminUserStatsDto, GetUserDto } from '../../dto/adminDTO/adminUsers.dto.js';
import { mapUpdateUserStatusToUserModel, mapUserQuery } from '../../mapper/adminMapper/adminUsers.mapper.js';
import { MESSAGES } from '../../contants/contants.js';

@injectable()
export class AdminUserController implements IAdminUserController {
  private _adminUserService: IAdminUserServices;
  constructor(@inject('IAdminUserServices') adminUserService: IAdminUserServices) {
    this._adminUserService = adminUserService;
  }

  async getUserStats(req: Request, res: Response): Promise<void> {
   
      const result: AdminUserStatsDto = await this._adminUserService.getUserStats();
      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER.FETCH_STATS_SUCCESS,
        data: result,
      });

  }

  async getUsers(req: Request, res: Response): Promise<void> {
      const queryDto: GetUserDto = mapUserQuery(req.query);

      const result = await this._adminUserService.getUsers(queryDto);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER.FETCH_SUCCESS,
        data: result,
      });

  }

  async getUserDetail(req: Request, res: Response): Promise<void> {

      const { id } = req.query;

      const result = await this._adminUserService.getUserDetail(id as string);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER.FETCH_SUCCESS,
        data: result,
      });

  }

  async updateUserStatus(req: Request, res: Response): Promise<void> {

      const result = await this._adminUserService.updateUserStatus(req.body);
      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER.UPDATED,
        data: result,
      });

  }
}
