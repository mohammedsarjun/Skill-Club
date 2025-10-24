import { Types } from 'mongoose';
import { ISkill } from '../models/interfaces/i-skill.model';
import { skillModel } from '../models/skill.model';
import BaseRepository from './baseRepositories/base-repository';
import { ISkillRepository } from './interfaces/i-skill-repository';

export class SkillRepository extends BaseRepository<ISkill> implements ISkillRepository {
  constructor() {
    super(skillModel);
  }
  getSuggestedSkills(specialities: Types.ObjectId[]): Promise<ISkill[] | null> {
    return this.findAll({ specialities: { $in: specialities } });
  }
}
