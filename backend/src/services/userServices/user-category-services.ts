import { injectable, inject } from 'tsyringe';
import { IUserCategoryServices } from './interfaces/i-user-category-services';
import type { ICategoryRepository } from '../../repositories/interfaces/i-category-repository';
import { CategoryDtoMinimal } from '../../dto/category.dto';
import { mapCategoryModelToCategoryDtoMinimal } from '../../mapper/category.mapper';

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
