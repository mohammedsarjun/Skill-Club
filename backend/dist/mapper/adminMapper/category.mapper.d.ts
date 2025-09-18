import { CreateCategoryDTO, CategoryDto, GetCategoryDto } from "../../dto/adminDTO/category.dto.js";
import { ICategory } from "../../models/interfaces/ICategoryModel.js";
export declare const mapCreateCategoryDtoToCategoryModel: (dto: CreateCategoryDTO) => Pick<ICategory, "name" | "description" | "status">;
export declare const mapCategoryModelToCategoryDto: (category: ICategory) => CategoryDto;
export declare function mapCategoryQuery(dto: any): GetCategoryDto;
//# sourceMappingURL=category.mapper.d.ts.map