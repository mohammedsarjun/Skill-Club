import { ISkill } from "../../models/interfaces/ISkillModel.js";
import BaseRepository from "../baseRepositories/baseRepository.js";
export interface ISkillRepository extends BaseRepository<ISkill> {
    getSuggestedSkills(specialities: string[]): Promise<ISkill[] | null>;
}
//# sourceMappingURL=ISkillRepository.d.ts.map