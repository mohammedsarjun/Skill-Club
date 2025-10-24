var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
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
let AdminCategoryServices = class AdminCategoryServices {
  constructor(adminCategoryRepository) {
    this._adminCategoryRepository = adminCategoryRepository;
  }
  async addCategory(categoryData) {
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
  async getCategory(filterData) {
    const filterDataDto = mapCategoryQuery(filterData);
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
    let data;
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
  async editCategory(data, id) {
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
};
AdminCategoryServices = __decorate(
  [
    injectable(),
    __param(0, inject('IAdminCategoryRepository')),
    __metadata('design:paramtypes', [Object]),
  ],
  AdminCategoryServices,
);
export { AdminCategoryServices };
//# sourceMappingURL=adminCategoryServices.js.map
