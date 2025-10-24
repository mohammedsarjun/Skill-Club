import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { HttpStatus } from '../../enums/http-status.enum';
import { MESSAGES } from '../../contants/contants';
import type { IUserCategoryController } from './interfaces/i-user-category-controller';
import type { IUserCategoryServices } from '../../services/userServices/interfaces/i-user-category-services';
import { CategoryDtoMinimal } from '../../dto/category.dto';

@injectable()
export class UserCategoryController implements IUserCategoryController {
  private _userCategoryService: IUserCategoryServices;

  constructor(@inject('IUserCategoryServices') userCategoryService: IUserCategoryServices) {
    this._userCategoryService = userCategoryService;
  }

  async getAllCategory(_req: Request, res: Response): Promise<void> {
    const categories: CategoryDtoMinimal[] | null =
      await this._userCategoryService.getAllCategories();

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.CATEGORY.FETCH_SUCCESS,
      data: categories,
    });
  }
}
