import { skillModel } from '../models/skillModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
export class SkillRepository extends BaseRepository {
  constructor() {
    super(skillModel);
  }
  getSuggestedSkills(specialities) {
    return this.findAll({ specialities: { $in: specialities } });
  }
}
//# sourceMappingURL=skillRepository.js.map
