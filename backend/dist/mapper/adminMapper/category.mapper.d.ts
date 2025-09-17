import { CreateCategoryDTO } from "../../dto/adminDTO/category.dto.js";
import { ICategory } from "../../models/interfaces/ICategoryModel.js";
export declare const mapCreateCategoryDtoToCategoryModel: (dto: CreateCategoryDTO) => Pick<ICategory, "name" | "description" | "status">;
//# sourceMappingURL=category.mapper.d.ts.map