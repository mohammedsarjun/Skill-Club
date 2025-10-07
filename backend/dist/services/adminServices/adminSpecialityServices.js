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
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { mapCreateSpecialityDtoToSpecialityModel, mapSpecialityModelToSpecialityDto, mapUpdateSpecialityDtoToSpecialityModel, } from '../../mapper/speciality.mapper.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
let AdminSpecialityServices = class AdminSpecialityServices {
    constructor(adminSpecialityRepository) {
        this._adminSpecialityRepository = adminSpecialityRepository;
    }
    async addSpeciality(specialityData) {
        const specialityDataDto = mapCreateSpecialityDtoToSpecialityModel(specialityData);
        const existing = await this._adminSpecialityRepository.findOne({
            name: specialityDataDto.name,
        });
        if (existing) {
            throw new AppError(ERROR_MESSAGES.SPECIALITY.ALREADY_EXIST, HttpStatus.CONFLICT);
        }
        // Create speciality
        const created = await this._adminSpecialityRepository.create(specialityDataDto);
        // Fetch with category populated
        const populated = await this._adminSpecialityRepository.findOne({ _id: created._id }, { populate: { path: 'category', select: '_id name' } });
        if (!populated) {
            throw new AppError('Speciality not found after creation', HttpStatus.NOT_FOUND);
        }
        const result = mapSpecialityModelToSpecialityDto(populated);
        return result;
    }
    async getSpeciality(filterData) {
        const page = filterData.page ?? 1;
        const limit = filterData.limit ?? 10;
        const skip = (page - 1) * limit;
        const categoryFilter = filterData.categoryFilter;
        const mode = filterData.mode;
        console.log(categoryFilter);
        const result = await this._adminSpecialityRepository.findAllWithFilters({
            search: filterData.search, // just values
            category: filterData.categoryFilter, // just values
        }, {
            skip,
            limit,
            populate: {
                path: 'category',
                select: '_id name',
            },
        });
        const total = await this._adminSpecialityRepository.count({
            name: filterData.search || '',
        });
        // Map to DTO
        const data = result.map(mapSpecialityModelToSpecialityDto);
        return {
            data,
            total,
            page,
            limit,
        };
    }
    // service
    async editSpeciality(specialityData) {
        // Check for duplicate name
        if (specialityData?.name) {
            const existing = await this._adminSpecialityRepository.findOne({ name: specialityData.name });
            if (existing && existing._id.toString() !== specialityData.id) {
                throw new AppError(ERROR_MESSAGES.SPECIALITY.ALREADY_EXIST, HttpStatus.CONFLICT);
            }
        }
        // Map DTO to model and update
        const dto = mapUpdateSpecialityDtoToSpecialityModel(specialityData);
        await this._adminSpecialityRepository.update(specialityData.id, dto);
        // ✅ Fetch updated speciality with category populated
        const updatedSpeciality = await this._adminSpecialityRepository.findOne({ _id: specialityData.id }, { populate: { path: 'category', select: '_id name' } });
        if (!updatedSpeciality) {
            throw new AppError('Speciality not found after update', HttpStatus.NOT_FOUND);
        }
        const result = mapSpecialityModelToSpecialityDto(updatedSpeciality);
        return result;
    }
};
AdminSpecialityServices = __decorate([
    injectable(),
    __param(0, inject('IAdminSpecialityRepository')),
    __metadata("design:paramtypes", [Object])
], AdminSpecialityServices);
export { AdminSpecialityServices };
//# sourceMappingURL=adminSpecialityServices.js.map