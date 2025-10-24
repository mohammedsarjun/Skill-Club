import { ResSkillDtoMinimal } from '../../../dto/skill.dto.js';
export interface IUserSkillServices {
  getSuggestedSkills(specialities: string[]): Promise<ResSkillDtoMinimal[] | null>;
}
//# sourceMappingURL=IUserSkillService.d.ts.map
