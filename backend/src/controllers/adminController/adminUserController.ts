import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { jwtService } from '../../utils/jwt.js';
import { IAdminUserController } from './interfaces/IAdminUserController.js';
import type { IAdminUserServices } from '../../services/adminServices/interfaces/IAdminUserServices.js';
import { AdminUserStatsDto, GetUserDto } from '../../dto/adminDTO/adminUsers.dto.js';
import { mapUserQuery } from '../../mapper/adminMapper/adminUsers.mapper.js';

@injectable()
export class AdminUserController implements IAdminUserController {
  private _adminUserService: IAdminUserServices;
  constructor(@inject('IAdminUserServices') adminUserService: IAdminUserServices) {
    this._adminUserService = adminUserService;
  }

  async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      const result: AdminUserStatsDto = await this._adminUserService.getUserStats();
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'User Stats Fetched Successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {

      const queryDto: GetUserDto = mapUserQuery(req.query)
     const result = await this._adminUserService.getUsers(queryDto);

      res.status(HttpStatus.OK).json({
        success: true,
        message: 'User Fetched Successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
