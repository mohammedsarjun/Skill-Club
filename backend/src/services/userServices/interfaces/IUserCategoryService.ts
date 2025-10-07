import { CategoryDtoMinimal } from "../../../dto/category.dto.js";
import { IUser } from "../../../models/interfaces/IUserModel.js";

export interface IUserCategoryServices{
    getAllCategories():Promise<CategoryDtoMinimal[]|null >;
}