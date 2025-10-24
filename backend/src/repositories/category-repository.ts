import BaseRepository from './baseRepositories/base-repository';

import { ICategoryRepository } from './interfaces/i-category-repository';
import { categoryModel } from '../models/category.model';
import { ICategory } from '../models/interfaces/i-category.model';

export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository {
  constructor() {
    super(categoryModel);
  }

  getCategories(): Promise<ICategory[] | null> {
    return this.model.find();
  }
}
