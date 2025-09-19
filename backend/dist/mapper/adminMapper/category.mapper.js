export const mapCreateCategoryDtoToCategoryModel = (dto) => {
    return {
        name: dto.name,
        description: dto.description,
        status: dto.status,
    };
};
export const mapUpdateCategoryDtoToCategoryModel = (dto // <- make it partial
) => {
    const updatedData = {};
    if (dto.name !== undefined)
        updatedData.name = dto.name;
    if (dto.description !== undefined)
        updatedData.description = dto.description;
    if (dto.status !== undefined)
        updatedData.status = dto.status;
    return updatedData;
};
export const mapCategoryModelToCategoryDto = (category) => {
    return {
        id: category._id.toString(),
        name: category.name,
        description: category.description,
        status: category.status,
    };
};
export const mapCategoryModelToCategoryDtoMinimal = (category) => {
    return {
        id: category._id.toString(),
        name: category.name,
    };
};
export function mapCategoryQuery(dto) {
    return {
        search: dto.search || "",
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
        mode: dto.mode
    };
}
//# sourceMappingURL=category.mapper.js.map