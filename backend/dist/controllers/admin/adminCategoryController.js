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
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { MESSAGES } from '../../contants/contants.js';
let AdminCategoryController = class AdminCategoryController {
    constructor(adminCategoryService) {
        this.adminCategoryService = adminCategoryService;
    }
    async addCategory(req, res) {
        try {
            const categoryDto = req.body;
            const result = await this.adminCategoryService.addCategory(categoryDto);
            res.status(HttpStatus.CREATED).json({
                success: true,
                message: MESSAGES.CATEGORY.CREATED,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async editCategory(req, res) {
        try {
            const dto = req.body;
            const result = await this.adminCategoryService.editCategory(dto, dto.id);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.CATEGORY.UPDATED,
                data: result,
            });
        }
        catch (error) {
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
            const dto = {
                search: typeof req.query.search === "string" ? req.query.search : "",
                page: Number(req?.query?.page) || 1,
                limit: Number(req?.query?.limit) || 10,
                mode: typeof req.query.mode === "string" ? req.query.mode : ""
            };
            const result = await this.adminCategoryService.getCategory(dto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.CATEGORY.FETCH_SUCCESS,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
AdminCategoryController = __decorate([
    injectable(),
    __param(0, inject('IAdminCategoryServices')),
    __metadata("design:paramtypes", [Object])
], AdminCategoryController);
export { AdminCategoryController };
//# sourceMappingURL=adminCategoryController.js.map