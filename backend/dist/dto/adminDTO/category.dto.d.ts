export interface CreateCategoryDTO {
    name: string;
    description: string;
    status: string;
}
export interface GetCategoryDto {
    search?: string;
    page?: number;
    limit?: number;
}
export interface CategoryDto {
    id: string;
    name: string;
    description: string;
    status: string;
}
export interface PaginatedCategoryDto {
    data: CategoryDto[];
    total: number;
    page: number;
    limit: number;
}
//# sourceMappingURL=category.dto.d.ts.map