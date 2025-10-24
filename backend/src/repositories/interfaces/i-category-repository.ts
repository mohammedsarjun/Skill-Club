import BaseRepository from '../baseRepositories/base-repository';
import { ICategory } from '../../models/interfaces/i-category.model';

export interface ICategoryRepository extends BaseRepository<ICategory> {
  getCategories(): Promise<ICategory[] | null>;
}
