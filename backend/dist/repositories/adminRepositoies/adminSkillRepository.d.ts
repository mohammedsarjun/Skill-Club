import { ISkill } from '../../models/interfaces/ISkillModel.js';
import BaseRepository from '../baseRepositories/baseRepository.js';
import { IAdminSkillRepository } from './interfaces/IAdminSkillRepository.js';
export declare class AdminSkillRepository
  extends BaseRepository<ISkill>
  implements IAdminSkillRepository
{
  constructor();
  findAllWithFilters(
    filters: {
      search?: string;
      category?: string;
    },
    options: {
      skip?: number;
      limit?: number;
      populate?: {
        path: string;
        select?: string;
      };
      select?: string;
    },
  ): Promise<ISkill[]>;
}
//# sourceMappingURL=adminSkillRepository.d.ts.map
