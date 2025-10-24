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
import '../../config/container.js';
import {
  mapCreateCategoryDtoToCategoryModel,
  mapCategoryQuery,
  mapUpdateCategoryDtoToCategoryModel,
} from '../../mapper/adminMapper/category.mapper.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
let AdminCategoryController = class AdminCategoryController {
  constructor(adminCategoryService) {
    this.adminCategoryService = adminCategoryService;
  }
  async addCategory(req, res) {
    try {
      const dto = mapCreateCategoryDtoToCategoryModel(req.body);
      const result = await this.adminCategoryService.addCategory(dto);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Category created successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
  async editCategory(req, res) {
    try {
      const dto = req.body;
      const updateData = mapUpdateCategoryDtoToCategoryModel(dto);
      const result = await this.adminCategoryService.editCategory(updateData, dto.id);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Category Edited successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
  listOrUnlistCategory(req, res) {
    return Promise.resolve();
  }
  findCategoryById(req, res) {
    return Promise.resolve();
  }
  async getAllCategory(req, res) {
    try {
      const dto = mapCategoryQuery(req.query);
      const result = await this.adminCategoryService.getCategory(dto);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Data Fetched successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
};
AdminCategoryController = __decorate(
  [
    injectable(),
    __param(0, inject('IAdminCategoryServices')),
    __metadata('design:paramtypes', [Object]),
  ],
  AdminCategoryController,
);
export { AdminCategoryController };
//# sourceMappingURL=adminCategoryController.js.map
