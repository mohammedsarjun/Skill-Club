import { Types } from 'mongoose';
import { ISkill } from '../../models/interfaces/i-skill.model';
import BaseRepository from '../baseRepositories/base-repository';

export interface ISkillRepository extends BaseRepository<ISkill> {
  getSuggestedSkills(specialities: Types.ObjectId[]): Promise<ISkill[] | null>;
}
