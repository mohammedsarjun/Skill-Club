"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSpecialityModelToSpecialityDtoMinimal = exports.mapSpecialityModelToSpecialityDto = exports.mapUpdateSpecialityDtoToSpecialityModel = exports.mapCreateSpecialityDtoToSpecialityModel = void 0;
exports.mapSpecialityQuery = mapSpecialityQuery;
const mapCreateSpecialityDtoToSpecialityModel = (dto) => {
    return {
        name: dto.name,
        category: dto.category,
        status: dto.status,
    };
};
exports.mapCreateSpecialityDtoToSpecialityModel = mapCreateSpecialityDtoToSpecialityModel;
const mapUpdateSpecialityDtoToSpecialityModel = (dto) => {
    const updatedData = {};
    if (dto.name !== undefined)
        updatedData.name = dto.name;
    if (dto.category !== undefined)
        updatedData.category = dto.category;
    if (dto.status !== undefined)
        updatedData.status = dto.status;
    return updatedData;
};
exports.mapUpdateSpecialityDtoToSpecialityModel = mapUpdateSpecialityDtoToSpecialityModel;
function mapSpecialityQuery(dto) {
    return {
        search: dto.search || '',
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
        categoryFilter: dto?.filter?.category ? dto.filter.category : undefined,
        mode: dto.mode,
    };
}
const mapSpecialityModelToSpecialityDto = (speciality) => {
    return {
        id: speciality._id.toString(),
        name: speciality.name,
        category: speciality.category?._id?.toString() ?? speciality.category?.toString() ?? '',
        categoryName: speciality.category ? speciality.category.name : '',
        status: speciality.status,
    };
};
exports.mapSpecialityModelToSpecialityDto = mapSpecialityModelToSpecialityDto;
const mapSpecialityModelToSpecialityDtoMinimal = (specaility) => {
    return {
        id: specaility._id.toString(),
        name: specaility.name,
    };
};
exports.mapSpecialityModelToSpecialityDtoMinimal = mapSpecialityModelToSpecialityDtoMinimal;
//# sourceMappingURL=speciality.mapper.js.map