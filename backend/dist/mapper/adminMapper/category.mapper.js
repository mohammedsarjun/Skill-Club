export const mapCreateCategoryDtoToCategoryModel = (dto) => {
    return {
        name: dto.name,
        description: dto.description,
        status: dto.status,
    };
};
export const mapCategoryModelToCategoryDto = (category) => {
    return {
        id: category._id.toString(),
        name: category.name,
        description: category.description,
        status: category.status,
    };
};
export function mapCategoryQuery(dto) {
    return {
        search: dto.search || "",
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
    };
}
//# sourceMappingURL=category.mapper.js.map