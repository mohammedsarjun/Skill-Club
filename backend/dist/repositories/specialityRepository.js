import BaseRepository from './baseRepositories/baseRepository.js';
import { specialityModel } from '../models/specialityModel.js';
export class SpecialityRepository extends BaseRepository {
  constructor() {
    super(specialityModel);
  }
  getSpeciality(categoryId) {
    return this.model.find({ category: categoryId });
  }
}
//# sourceMappingURL=specialityRepository.js.map
