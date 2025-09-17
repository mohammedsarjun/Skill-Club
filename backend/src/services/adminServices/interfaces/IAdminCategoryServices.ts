import { CreateCategoryDTO } from "../../../dto/adminDTO/category.dto.js"

export interface IAdminCategoryServices{
    addCategory(categoryData:CreateCategoryDTO):Promise<any>
}