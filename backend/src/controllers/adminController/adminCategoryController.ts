import { Request, Response } from "express";
import type { IAdminCategoryController } from "./interfaces/IAdminCategoryController.js";
import { injectable, inject } from "tsyringe";
import type { IAdminCategoryServices } from "../../services/adminServices/interfaces/IAdminCategoryServices.js";
import "../../config/container.js";
import { mapCreateCategoryDtoToCategoryModel } from "../../mapper/adminMapper/category.mapper.js";
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
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data:result
      });
    } catch (error) {
      throw error;
    }
  }

  editCategory(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  listOrUnlistCategory(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  findCategoryById(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }

  getAllCategory(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }
}
