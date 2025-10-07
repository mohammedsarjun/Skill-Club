import BaseRepository from './baseRepositories/baseRepository.js';
import { categoryModel } from '../models/categoryModel.js';
export class CategoryRepository extends BaseRepository {
    constructor() {
        super(categoryModel);
    }
    getCategories() {
        return this.model.find();
    }
}
//# sourceMappingURL=categoryRepository.js.map