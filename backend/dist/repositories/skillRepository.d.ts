import { ISkill } from '../models/interfaces/ISkillModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
import { ISkillRepository } from './interfaces/ISkillRepository.js';
export declare class SkillRepository extends BaseRepository<ISkill> implements ISkillRepository {
  constructor();
  getSuggestedSkills(specialities: string[]): Promise<ISkill[] | null>;
}
//# sourceMappingURL=skillRepository.d.ts.map
