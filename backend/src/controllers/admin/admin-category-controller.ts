import { Request, Response } from 'express';
import type { IAdminCategoryController } from './interfaces/i-admin-category-controller';
import { injectable, inject } from 'tsyringe';
import type { IAdminCategoryServices } from '../../services/adminServices/interfaces/i-admin-category-services';
import '../../config/container';
import { CategoryQueryParams, CreateCategoryDTO, UpdateCategoryDTO } from '../../dto/category.dto';
import { HttpStatus } from '../../enums/http-status.enum';
import { MESSAGES } from '../../contants/contants';

@injectable()
export class AdminCategoryController implements IAdminCategoryController {
  private adminCategoryService: IAdminCategoryServices;

  constructor(
    @inject('IAdminCategoryServices')
    adminCategoryService: IAdminCategoryServices,
  ) {
    this.adminCategoryService = adminCategoryService;
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    const categoryDto: CreateCategoryDTO = req.body;
    const result = await this.adminCategoryService.addCategory(categoryDto);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: MESSAGES.CATEGORY.CREATED,
      data: result,
    });
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    const dto: UpdateCategoryDTO = req.body;

    const result = await this.adminCategoryService.editCategory(dto, dto.id);

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.CATEGORY.UPDATED,
      data: result,
    });
  }

  async getAllCategory(req: Request, res: Response): Promise<void> {
    const dto: CategoryQueryParams = {
      search: typeof req.query.search === 'string' ? req.query.search : '',
      page: Number(req?.query?.page) || 1,
      limit: Number(req?.query?.limit) || 10,
      mode: typeof req.query.mode === 'string' ? req.query.mode : '',
    };
    const result = await this.adminCategoryService.getCategory(dto);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.CATEGORY.FETCH_SUCCESS,
      data: result,
    });
  }
}
