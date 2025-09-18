import {
  CreateCategoryDTO,
  CategoryDto,
  GetCategoryDto,
} from "../../dto/adminDTO/category.dto.js";
import { ICategory } from "../../models/interfaces/ICategoryModel.js";

export const mapCreateCategoryDtoToCategoryModel = (
  dto: CreateCategoryDTO
): Pick<ICategory, "name" | "description" | "status"> => {
  return {
    name: dto.name,
    description: dto.description,
    status: dto.status,
  };
};

export const mapCategoryModelToCategoryDto = (
  category: ICategory
): CategoryDto => {
  return {
    id: category._id.toString(),
    name: category.name,
    description: category.description,
    status: category.status,
  };
};

export function mapCategoryQuery(dto: any): GetCategoryDto {
  return {
    search: dto.search || "",
    page: dto.page ? Number(dto.page) : 1,
    limit: dto.limit ? Number(dto.limit) : 10,
  };
}
