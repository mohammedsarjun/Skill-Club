import { IAdminCategoryServices } from "./interfaces/IAdminCategoryServices.js";
import {
  CategoryDto,
  CreateCategoryDTO,
  GetCategoryDto,
  PaginatedCategoryDto,
} from "../../dto/adminDTO/category.dto.js";
import { AdminCategoryRepository } from "../../repositories/adminRepositoies/adminCategoryRepository.js";
import type { IAdminCategoryRepository } from "../../repositories/adminRepositoies/interfaces/IAdminCategoryRepository.js";
import { injectable, inject } from "tsyringe";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { mapCategoryModelToCategoryDto } from "../../mapper/adminMapper/category.mapper.js";
@injectable()
export class AdminCategoryServices implements IAdminCategoryServices {
  private adminCategoryRepository;

  constructor(
    @inject("IAdminCategoryRepository")
    adminCategoryRepository: IAdminCategoryRepository
  ) {
    this.adminCategoryRepository = adminCategoryRepository;
  }
  async addCategory(categoryData: CreateCategoryDTO): Promise<any> {
    const existing = await this.adminCategoryRepository.findOne({
      name: categoryData.name,
    });

    if (existing) {
      throw new AppError(
        "Category with this name already exists",
        HttpStatus.CONFLICT
      );
    }

    const result = await this.adminCategoryRepository.create(categoryData);

    return {
      id: result._id,
      name: result.name,
      description: result.description,
      status: result.status,
    };
  }

  async getCategory(filterData: GetCategoryDto): Promise<PaginatedCategoryDto> {
    const page = filterData.page ?? 1;
    const limit = filterData.limit ?? 10;
    const skip = (page - 1) * limit;

    const result = await this.adminCategoryRepository.findAll(
      { name: { $regex: filterData.search || "", $options: "i" } },
      { skip, limit }
    );


    const total = await this.adminCategoryRepository.count({
      name: filterData.search || "",
    });

    // Map to DTO
    const data: CategoryDto[] = result.map(mapCategoryModelToCategoryDto);
    return {
      data,
      total,
      page,
      limit,
    };
  }
}
