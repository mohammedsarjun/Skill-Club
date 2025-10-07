import { CreateSkillDTO, GetSkillDto, UpdateSkillDTO } from "../../../dto/adminDTO/skill.dto.js"


export interface IAdminSkillServices{
    addSkill(skillData:CreateSkillDTO):Promise<any>
    getSkills(filterData:GetSkillDto):Promise<any>
    editSkill(id:string,skillData:Partial<UpdateSkillDTO>):Promise<any>
}