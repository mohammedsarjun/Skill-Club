var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from "tsyringe";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { mapCategoryModelToCategoryDto } from "../../mapper/adminMapper/category.mapper.js";
let AdminCategoryServices = class AdminCategoryServices {
    constructor(adminCategoryRepository) {
        this.adminCategoryRepository = adminCategoryRepository;
    }
    async addCategory(categoryData) {
        const existing = await this.adminCategoryRepository.findOne({
            name: categoryData.name,
        });
        if (existing) {
            throw new AppError("Category with this name already exists", HttpStatus.CONFLICT);
        }
        const result = await this.adminCategoryRepository.create(categoryData);
        return {
            id: result._id,
            name: result.name,
            description: result.description,
            status: result.status,
        };
    }
    async getCategory(filterData) {
        const page = filterData.page ?? 1;
        const limit = filterData.limit ?? 10;
        const skip = (page - 1) * limit;
        const result = await this.adminCategoryRepository.findAll({ name: { $regex: filterData.search || "", $options: "i" } }, { skip, limit });
        const total = await this.adminCategoryRepository.count({
            name: filterData.search || "",
        });
        // Map to DTO
        const data = result.map(mapCategoryModelToCategoryDto);
        return {
            data,
            total,
            page,
            limit,
        };
    }
};
AdminCategoryServices = __decorate([
    injectable(),
    __param(0, inject("IAdminCategoryRepository")),
    __metadata("design:paramtypes", [Object])
], AdminCategoryServices);
export { AdminCategoryServices };
//# sourceMappingURL=adminCategoryServices.js.map