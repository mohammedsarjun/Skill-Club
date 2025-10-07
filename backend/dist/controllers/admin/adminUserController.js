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
import { mapUpdateUserStatusToUserModel, mapUserQuery } from '../../mapper/adminMapper/adminUsers.mapper.js';
import { MESSAGES } from '../../contants/contants.js';
let AdminUserController = class AdminUserController {
    constructor(adminUserService) {
        this._adminUserService = adminUserService;
    }
    async getUserStats(req, res) {
        try {
            const result = await this._adminUserService.getUserStats();
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.USER.FETCH_STATS_SUCCESS,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getUsers(req, res) {
        try {
            const queryDto = mapUserQuery(req.query);
            const result = await this._adminUserService.getUsers(queryDto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.USER.FETCH_SUCCESS,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getUserDetail(req, res) {
        try {
            const { id } = req.query;
            const result = await this._adminUserService.getUserDetail(id);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.USER.FETCH_SUCCESS,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserStatus(req, res) {
        try {
            const dto = mapUpdateUserStatusToUserModel(req.body);
            const result = await this._adminUserService.updateUserStatus(dto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.USER.UPDATED,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
AdminUserController = __decorate([
    injectable(),
    __param(0, inject('IAdminUserServices')),
    __metadata("design:paramtypes", [Object])
], AdminUserController);
export { AdminUserController };
//# sourceMappingURL=adminUserController.js.map