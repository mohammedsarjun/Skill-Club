import { IAdminCategoryServices } from './interfaces/IAdminCategoryServices.js';
import {
  CategoryDto,
  CategoryDtoMinimal,
  CreateCategoryDTO,
  GetCategoryDto,
  PaginatedCategoryDto,
  UpdateCategoryDTO,
} from '../../dto/category.dto.js';
import type { IAdminCategoryRepository } from '../../repositories/adminRepositories/interfaces/IAdminCategoryRepository.js';
import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import {
  mapCategoryModelToCategoryDto,
  mapCategoryModelToCategoryDtoMinimal,
  mapCategoryQuery,
  mapCreateCategoryDtoToCategoryModel,
  mapUpdateCategoryDtoToCategoryModel,
} from '../../mapper/category.mapper.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';

@injectable()
export class AdminCategoryServices implements IAdminCategoryServices {
  private _adminCategoryRepository;

  constructor(
    @inject('IAdminCategoryRepository')
    adminCategoryRepository: IAdminCategoryRepository,
  ) {
    this._adminCategoryRepository = adminCategoryRepository;
  }
  async addCategory(categoryData: CreateCategoryDTO): Promise<any> {
    const categoryDto = mapCreateCategoryDtoToCategoryModel(categoryData);
    const existing = await this._adminCategoryRepository.findOne({
      name: categoryDto.name,
    });

    if (existing) {
      throw new AppError(ERROR_MESSAGES.CATEGORY.ALREADY_EXIST, HttpStatus.CONFLICT);
    }

    const result = await this._adminCategoryRepository.create(categoryDto);

    return {
      id: result._id,
      name: result.name,
      description: result.description,
      status: result.status,
    };
  }

  async getCategory(filterData: GetCategoryDto): Promise<PaginatedCategoryDto> {
    const filterDataDto = mapCategoryQuery(filterData)
    const page = filterDataDto.page ?? 1;
    const limit = filterDataDto.limit ?? 10;
    const skip = (page - 1) * limit;
    const mode = filterDataDto.mode;

    const result = await this._adminCategoryRepository.findAll(
      { name: { $regex: filterDataDto.search || '', $options: 'i' } },
      { skip, limit },
    );

    const total = await this._adminCategoryRepository.count({
      name: filterDataDto.search || '',
    });

    // Map to DTO
    let data: CategoryDto[] | CategoryDtoMinimal[];

    if (mode == 'detailed') {
      data = result.map(mapCategoryModelToCategoryDto);
    } else {
      data = result.map(mapCategoryModelToCategoryDtoMinimal);
    }

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async editCategory(data: Partial<UpdateCategoryDTO>, id: string): Promise<any> {
    const updateData = mapUpdateCategoryDtoToCategoryModel(data);
    if (updateData.name) {
      const existing = await this._adminCategoryRepository.findOne({
        name: updateData.name,
      });
      if (existing) {
        throw new AppError(ERROR_MESSAGES.CATEGORY.ALREADY_EXIST, HttpStatus.CONFLICT);
      }
    }

    const result = await this._adminCategoryRepository.update(id, updateData);

    return {
      id: result?._id,
      name: result?.name,
      description: result?.description,
      status: result?.status,
    };
  }
}
