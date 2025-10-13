import { CategoryDtoMinimal } from "../../../dto/category.dto.js";

export interface IUserCategoryServices{
    getAllCategories():Promise<CategoryDtoMinimal[]|null >;
}