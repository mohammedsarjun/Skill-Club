import BaseRepository from '../../baseRepositories/base-repository';
import { ISkill } from '../../../models/interfaces/i-skill.model';
import { CreateSkillDTO } from 'src/dto/adminDTO/skill.dto';
export interface IAdminSkillRepository extends BaseRepository<ISkill> {
  findAllWithFilters(
    filters: { search?: string; category?: string },
    options: {
      skip?: number;
      limit?: number;
      populate?: {
        path: string;
        select?: string;
      };
      select?: string;
    },
  ): Promise<ISkill[] | null>;
  createSkill(skillData: CreateSkillDTO): Promise<ISkill | null>;
}
