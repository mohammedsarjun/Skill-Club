import { IUserCategoryServices } from './interfaces/IUserCategoryService.js';
import type { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository.js';
import { CategoryDtoMinimal } from '../../dto/category.dto.js';
export declare class userCategoryServices implements IUserCategoryServices {
  private _categoryRepository;
  constructor(categoryRepository: ICategoryRepository);
  getAllCategories(): Promise<CategoryDtoMinimal[] | null>;
}
//# sourceMappingURL=userCategoryService.d.ts.map
