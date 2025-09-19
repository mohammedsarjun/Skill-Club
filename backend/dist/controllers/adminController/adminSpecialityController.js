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
import { mapCreateSpecialityDtoToSpecialityModel, mapSpecialityQuery } from "../../mapper/adminMapper/speciality.mapper.js";
import "../../config/container.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
let AdminSpecialityController = class AdminSpecialityController {
    constructor(adminSpecialityService) {
        this.adminSpecialityService = adminSpecialityService;
    }
    async addSpeciality(req, res) {
        try {
            const dto = mapCreateSpecialityDtoToSpecialityModel(req.body);
            const result = await this.adminSpecialityService.addSpeciality(dto);
            res.status(HttpStatus.CREATED).json({
                success: true,
                message: "Speciality created successfully",
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    editSpeciality(req, res) {
        return Promise.resolve();
    }
    async getAllSpeciality(req, res) {
        try {
            const dto = mapSpecialityQuery(req.query);
            const result = await this.adminSpecialityService.getSpeciality(dto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Speciality Fetched successfully",
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
        return Promise.resolve();
    }
};
AdminSpecialityController = __decorate([
    injectable(),
    __param(0, inject("IAdminSpecialityServices")),
    __metadata("design:paramtypes", [Object])
], AdminSpecialityController);
export { AdminSpecialityController };
//# sourceMappingURL=adminSpecialityController.js.map