import BaseRepository from '../../baseRepositories/baseRepository.js';
import { ISkill } from '../../../models/interfaces/ISkillModel.js';
export interface IAdminSkillRepository extends BaseRepository<ISkill> {
  findAllWithFilters(filters: any, options: any): Promise<ISkill[] | null>;
}
//# sourceMappingURL=IAdminSkillRepository.d.ts.map
