import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { MESSAGES } from '../../contants/contants.js';
import type { IUserCategoryController } from './interfaces/IUserCategoryController.js';
import type { IUserCategoryServices } from '../../services/userServices/interfaces/IUserCategoryService.js';
import { CategoryDtoMinimal } from '../../dto/category.dto.js';

@injectable()
export class UserCategoryController implements IUserCategoryController {
  private _userCategoryService: IUserCategoryServices;

  constructor(@inject('IUserCategoryServices') userCategoryService: IUserCategoryServices) {
    this._userCategoryService = userCategoryService;
  }

  async getAllCategory(req: Request, res: Response): Promise<void> {

      const categories:CategoryDtoMinimal[]|null = await this._userCategoryService.getAllCategories();

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.CATEGORY.FETCH_SUCCESS,
        data: categories,
      });
  }


}
