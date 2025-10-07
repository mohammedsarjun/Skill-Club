import { CreateCategoryDTO,GetCategoryDto,UpdateCategoryDTO, PaginatedCategoryDto } from "../../../dto/category.dto.js"

export interface IAdminCategoryServices{
    addCategory(categoryData:CreateCategoryDTO):Promise<any>
    getCategory(filterData:GetCategoryDto):Promise<PaginatedCategoryDto>
    editCategory(data:Partial<UpdateCategoryDTO>,id:string):Promise<any>
}