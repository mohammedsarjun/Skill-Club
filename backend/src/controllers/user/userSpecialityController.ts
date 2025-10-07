import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { MESSAGES } from '../../contants/contants.js';
import { IUserSpecialityController } from './interfaces/IUserSpecialityController.js';
import type { IUserSpecialityServices } from '../../services/userServices/interfaces/IUserSpecialityServices.js';
import { CategoryDtoMinimal } from '../../dto/category.dto.js';
import { SpecialityDtoMinimal } from '../../dto/speciality.dto.js';

@injectable()
export class UserSpecialityController implements IUserSpecialityController {
  private _userSpecialityService: IUserSpecialityServices;

  constructor(@inject('IUserSpecialityServices') userSpecialityService: IUserSpecialityServices) {
    this._userSpecialityService = userSpecialityService;
  }

  async getSpecialities(req: Request, res: Response): Promise<void> {
    try {
        const {categoryId}=req.query
      const specialities: SpecialityDtoMinimal[] | null =
        await this._userSpecialityService.getSpecialities(categoryId as string);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.SPECIALITY.FETCH_SUCCESS,
        data: specialities,
      });
    } catch (error: unknown) {
      throw error;
    }
  }
}
