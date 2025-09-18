import { CreateCategoryDTO,GetCategoryDto, PaginatedCategoryDto } from "../../../dto/adminDTO/category.dto.js"

export interface IAdminCategoryServices{
    addCategory(categoryData:CreateCategoryDTO):Promise<any>
    getCategory(filterData:GetCategoryDto):Promise<PaginatedCategoryDto>
}