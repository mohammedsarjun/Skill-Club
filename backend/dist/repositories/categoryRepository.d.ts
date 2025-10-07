import BaseRepository from './baseRepositories/baseRepository.js';
import { ICategoryRepository } from './interfaces/ICategoryRepository.js';
import { ICategory } from '../models/interfaces/ICategoryModel.js';
export declare class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository {
    constructor();
    getCategories(): Promise<ICategory[] | null>;
}
//# sourceMappingURL=categoryRepository.d.ts.map