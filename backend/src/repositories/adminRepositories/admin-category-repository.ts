import { ICategory } from '../../models/interfaces/i-category.model';
import { categoryModel } from '../../models/category.model';
import BaseRepository from '../baseRepositories/base-repository';
import { IAdminCategoryRepository } from './interfaces/i-admin-category-repository';

export class AdminCategoryRepository
  extends BaseRepository<ICategory>
  implements IAdminCategoryRepository
{
  constructor() {
    super(categoryModel);
  }
}
