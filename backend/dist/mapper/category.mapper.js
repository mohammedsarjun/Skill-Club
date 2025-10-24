"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCategoryModelToCategoryDtoMinimal = exports.mapCategoryModelToCategoryDto = exports.mapUpdateCategoryDtoToCategoryModel = exports.mapCreateCategoryDtoToCategoryModel = void 0;
exports.mapCategoryQuery = mapCategoryQuery;
const mapCreateCategoryDtoToCategoryModel = (dto) => {
    return {
        name: dto.name,
        description: dto.description,
        status: dto.status,
    };
};
exports.mapCreateCategoryDtoToCategoryModel = mapCreateCategoryDtoToCategoryModel;
const mapUpdateCategoryDtoToCategoryModel = (dto) => {
    const updatedData = {};
    if (dto.name !== undefined)
        updatedData.name = dto.name;
    if (dto.description !== undefined)
        updatedData.description = dto.description;
    if (dto.status !== undefined)
        updatedData.status = dto.status;
    return updatedData;
};
exports.mapUpdateCategoryDtoToCategoryModel = mapUpdateCategoryDtoToCategoryModel;
const mapCategoryModelToCategoryDto = (category) => {
    return {
        id: category._id.toString(),
        name: category.name,
        description: category.description,
        status: category.status,
    };
};
exports.mapCategoryModelToCategoryDto = mapCategoryModelToCategoryDto;
const mapCategoryModelToCategoryDtoMinimal = (category) => {
    return {
        id: category._id.toString(),
        name: category.name,
    };
};
exports.mapCategoryModelToCategoryDtoMinimal = mapCategoryModelToCategoryDtoMinimal;
function mapCategoryQuery(dto) {
    return {
        search: dto.search || '',
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
        mode: dto.mode,
    };
}
//# sourceMappingURL=category.mapper.js.map