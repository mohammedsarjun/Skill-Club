import { IAdminCategoryServices } from "./interfaces/IAdminCategoryServices.js";
import { CreateCategoryDTO, GetCategoryDto, PaginatedCategoryDto } from "../../dto/adminDTO/category.dto.js";
import type { IAdminCategoryRepository } from "../../repositories/adminRepositoies/interfaces/IAdminCategoryRepository.js";
export declare class AdminCategoryServices implements IAdminCategoryServices {
    private adminCategoryRepository;
    constructor(adminCategoryRepository: IAdminCategoryRepository);
    addCategory(categoryData: CreateCategoryDTO): Promise<any>;
    getCategory(filterData: GetCategoryDto): Promise<PaginatedCategoryDto>;
}
//# sourceMappingURL=adminCategoryServices.d.ts.map