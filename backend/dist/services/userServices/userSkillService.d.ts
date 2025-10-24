import { IUserSkillServices } from './interfaces/IUserSkillService.js';
import type { ISkillRepository } from '../../repositories/interfaces/ISkillRepository.js';
import { ResSkillDtoMinimal } from '../../dto/skill.dto.js';
export declare class UserSkillServices implements IUserSkillServices {
  private _skillRepository;
  constructor(skillRepository: ISkillRepository);
  getSuggestedSkills(specialities: string[]): Promise<ResSkillDtoMinimal[] | null>;
}
//# sourceMappingURL=userSkillService.d.ts.map
