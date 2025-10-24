import { CreateCategoryDTO, CategoryDto, GetCategoryDto, UpdateCategoryDTO, CategoryDtoMinimal, CategoryQueryParams } from '../dto/category.dto.js';
import { ICategory } from '../models/interfaces/i-category.model';
export declare const mapCreateCategoryDtoToCategoryModel: (dto: CreateCategoryDTO) => Pick<ICategory, "name" | "description" | "status">;
export declare const mapUpdateCategoryDtoToCategoryModel: (dto: Partial<UpdateCategoryDTO>) => Partial<Pick<ICategory, "name" | "description" | "status">>;
export declare const mapCategoryModelToCategoryDto: (category: ICategory) => CategoryDto;
export declare const mapCategoryModelToCategoryDtoMinimal: (category: ICategory) => CategoryDtoMinimal;
export declare function mapCategoryQuery(dto: CategoryQueryParams): GetCategoryDto;
//# sourceMappingURL=category.mapper.d.ts.map