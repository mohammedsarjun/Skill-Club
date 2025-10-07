import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';
import { IUserCategoryServices } from './interfaces/IUserCategoryService.js';
import type { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository.js';
import { CategoryDtoMinimal } from '../../dto/category.dto.js';
import { mapCategoryModelToCategoryDtoMinimal } from '../../mapper/category.mapper.js';

@injectable()
export class userCategoryServices implements IUserCategoryServices {
  private _categoryRepository: ICategoryRepository;
  constructor(@inject('ICategoryRepository') categoryRepository: ICategoryRepository) {
    this._categoryRepository = categoryRepository;
  }

  async getAllCategories(): Promise<CategoryDtoMinimal[] | null> {
    const result = await this._categoryRepository.getCategories();
    // Map to DTO

    const dtoData: CategoryDtoMinimal[] | null = result
      ? result.map(mapCategoryModelToCategoryDtoMinimal)
      : null;

    return dtoData;
  }
}
