import BaseRepository from '../../baseRepositories/base-repository';

import { ICategory } from '../../../models/interfaces/i-category.model';

export interface IClientCategoryRepository extends BaseRepository<ICategory> {
      getAllCategories(): Promise<ICategory[] | null>;
}
