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
import { mapSpecialityModelToSpecialityDto } from "../../mapper/adminMapper/speciality.mapper.js";
let AdminSpecialityServices = class AdminSpecialityServices {
    constructor(adminSpecialityRepository) {
        this.adminSpecialityRepository = adminSpecialityRepository;
    }
    async addSpeciality(specialityData) {
        const existing = await this.adminSpecialityRepository.findOne({
            name: specialityData.name,
        });
        if (existing) {
            throw new AppError("Speciality with this name already exists", HttpStatus.CONFLICT);
        }
        const result = await this.adminSpecialityRepository.create(specialityData);
        return {
            id: result._id,
            name: result.name,
            category: result.category,
            status: result.status,
        };
    }
    //   editSpeciality(data): Promise<any> {
    //   }
    async getSpeciality(filterData) {
        const page = filterData.page ?? 1;
        const limit = filterData.limit ?? 10;
        const skip = (page - 1) * limit;
        const mode = filterData.mode;
        const result = await this.adminSpecialityRepository.findAll({ name: { $regex: filterData.search || "", $options: "i" } }, { skip, limit, populate: { path: "category", select: "name" } });
        const total = await this.adminSpecialityRepository.count({
            name: filterData.search || "",
        });
        // Map to DTO
        let data = result.map(mapSpecialityModelToSpecialityDto);
        return {
            data,
            total,
            page,
            limit,
        };
    }
};
AdminSpecialityServices = __decorate([
    injectable(),
    __param(0, inject("IAdminSpecialityRepository")),
    __metadata("design:paramtypes", [Object])
], AdminSpecialityServices);
export { AdminSpecialityServices };
//# sourceMappingURL=adminSpecialityServices.js.map