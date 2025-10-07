

import BaseRepository from './baseRepositories/baseRepository.js';

import { ICategoryRepository } from './interfaces/ICategoryRepository.js';
import { categoryModel } from '../models/categoryModel.js';
import { ICategory } from '../models/interfaces/ICategoryModel.js';

export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository {
  constructor() {
    super(categoryModel);
  }
  
  getCategories(): Promise<ICategory[] | null> {
      return this.model.find()
  }

}
