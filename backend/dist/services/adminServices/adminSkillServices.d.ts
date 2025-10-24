import { IAdminSkillServices } from './interfaces/IAdminSkillServices.js';
import type { IAdminSkillRepository } from '../../repositories/adminRepositories/interfaces/IAdminSkillRepository.js';
import { CreateSkillDTO, GetSkillDto, UpdateSkillDTO } from '../../dto/adminDTO/skill.dto.js';
export declare class AdminSkillServices implements IAdminSkillServices {
  private _adminSkillRepository;
  constructor(adminSkillRepository: IAdminSkillRepository);
  addSkill(skillData: CreateSkillDTO): Promise<any>;
  getSkills(filterData: GetSkillDto): Promise<any>;
  editSkill(id: string, skilldata: Partial<UpdateSkillDTO>): Promise<any>;
}
//# sourceMappingURL=adminSkillServices.d.ts.map
