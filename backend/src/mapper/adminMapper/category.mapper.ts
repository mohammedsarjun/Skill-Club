import { CreateCategoryDTO } from "../../dto/adminDTO/category.dto.js";
import { ICategory } from "../../models/interfaces/ICategoryModel.js";

export const mapCreateCategoryDtoToCategoryModel = (
  dto: CreateCategoryDTO
  
):  Pick<ICategory, "name" | "description" | "status"> => {
  return {
    name: dto.name,
    description: dto.description,
    status: dto.status,
  };
};
