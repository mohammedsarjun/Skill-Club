"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdateSkillDtoToSkillModel = exports.mapSkillModelToAddSkillDto = exports.mapSkillModelToSkillDto = exports.mapCreateSkillDtoToSkillModel = void 0;
exports.mapSkillQuery = mapSkillQuery;
const mongoose_1 = require("mongoose");
const mapCreateSkillDtoToSkillModel = (dto) => {
    return {
        name: dto.name,
        specialities: dto.specialities.map((id) => new mongoose_1.Types.ObjectId(id)),
        status: dto.status,
    };
};
exports.mapCreateSkillDtoToSkillModel = mapCreateSkillDtoToSkillModel;
const mapSkillModelToSkillDto = (dto) => {
    return {
        id: dto._id.toString(),
        name: dto.name,
        specialities: dto.specialities.map((spec) => ({
            specialityId: spec._id.toString(),
            specialityName: spec.name,
        })),
        status: dto.status,
    };
};
exports.mapSkillModelToSkillDto = mapSkillModelToSkillDto;
const mapSkillModelToAddSkillDto = (dto) => {
    return {
        id: dto._id.toString(),
        name: dto.name,
        specialities: dto.specialities.map((spec) => ({
            specialityId: spec._id.toString(),
            specialityName: spec.name,
        })),
        status: dto.status,
    };
};
exports.mapSkillModelToAddSkillDto = mapSkillModelToAddSkillDto;
function mapSkillQuery(dto) {
    return {
        search: dto.search || '',
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
        mode: dto.mode,
    };
}
const mapUpdateSkillDtoToSkillModel = (dto) => {
    const updatedData = {};
    if (dto.name !== undefined)
        updatedData.name = dto.name;
    if (dto.specialties !== undefined)
        updatedData.specialities = dto.specialties;
    if (dto.status !== undefined)
        updatedData.status = dto.status;
    return updatedData;
};
exports.mapUpdateSkillDtoToSkillModel = mapUpdateSkillDtoToSkillModel;
//# sourceMappingURL=skill.mapper.js.map