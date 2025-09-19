import { Request, Response } from "express";
import type { IAdminCategoryController } from "./interfaces/IAdminCategoryController.js";
import { injectable, inject } from "tsyringe";
import type { IAdminCategoryServices } from "../../services/adminServices/interfaces/IAdminCategoryServices.js";
import "../../config/container.js";
import { UpdateCategoryDTO } from "../../dto/adminDTO/category.dto.js";
import {
  mapCreateCategoryDtoToCategoryModel,
  mapCategoryQuery,
  mapUpdateCategoryDtoToCategoryModel,
} from "../../mapper/adminMapper/category.mapper.js";
import { HttpStatus } from "../../enums/http-status.enum.js";

@injectable()
export class AdminCategoryController implements IAdminCategoryController {
  private adminCategoryService: IAdminCategoryServices;

  constructor(
    @inject("IAdminCategoryServices")
    adminCategoryService: IAdminCategoryServices
  ) {
    this.adminCategoryService = adminCategoryService;
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto = mapCreateCategoryDtoToCategoryModel(req.body);
      const result = await this.adminCategoryService.addCategory(dto);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Category created successfully",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto: UpdateCategoryDTO = req.body;
      const updateData = mapUpdateCategoryDtoToCategoryModel(dto);

      const result = await this.adminCategoryService.editCategory(
        updateData,
        dto.id
      );

      res.status(HttpStatus.OK).json({
        success: true,
        message: "Category Edited successfully",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  listOrUnlistCategory(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  findCategoryById(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  async getAllCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto = mapCategoryQuery(req.query);
      const result = await this.adminCategoryService.getCategory(dto);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Data Fetched successfully",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
