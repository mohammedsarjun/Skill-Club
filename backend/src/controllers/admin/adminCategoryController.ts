import { Request, Response } from 'express';
import type { IAdminCategoryController } from './interfaces/IAdminCategoryController.js';
import { injectable, inject } from 'tsyringe';
import type { IAdminCategoryServices } from '../../services/adminServices/interfaces/IAdminCategoryServices.js';
import '../../config/container.js';
import { CreateCategoryDTO, GetCategoryDto, UpdateCategoryDTO } from '../../dto/category.dto.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { MESSAGES } from '../../contants/contants.js';

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

  listOrUnlistCategory(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  findCategoryById(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  async getAllCategory(req: Request, res: Response): Promise<void> {
      const dto:GetCategoryDto ={
        search: typeof req.query.search === "string" ? req.query.search : "",
        page:Number(req?.query?.page)||1,
        limit:Number(req?.query?.limit)||10,
        mode: typeof req.query.mode === "string" ? req.query.mode : ""
      }
      const result = await this.adminCategoryService.getCategory(dto);
      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.CATEGORY.FETCH_SUCCESS,
        data: result,
      });
  }
}
