import { IAdminCategoryServices } from './interfaces/IAdminCategoryServices.js';
import { CreateCategoryDTO, GetCategoryDto, PaginatedCategoryDto, UpdateCategoryDTO } from '../../dto/category.dto.js';
import type { IAdminCategoryRepository } from '../../repositories/adminRepositories/interfaces/IAdminCategoryRepository.js';
export declare class AdminCategoryServices implements IAdminCategoryServices {
    private _adminCategoryRepository;
    constructor(adminCategoryRepository: IAdminCategoryRepository);
    addCategory(categoryData: CreateCategoryDTO): Promise<any>;
    getCategory(filterData: GetCategoryDto): Promise<PaginatedCategoryDto>;
    editCategory(data: Partial<UpdateCategoryDTO>, id: string): Promise<any>;
}
//# sourceMappingURL=adminCategoryServices.d.ts.map