import { GetSkillDto, UpdateSkillDTO } from "../../../dto/adminDTO/skill.dto.js";
export interface IAdminSkillServices {
    addSkill(skillData: any): Promise<any>;
    getSkills(filterData: GetSkillDto): Promise<any>;
    editSkill(id: string, skillData: Partial<UpdateSkillDTO>): Promise<any>;
}
//# sourceMappingURL=IAdminSkillServices.d.ts.map