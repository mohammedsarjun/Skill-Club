import { CreateSkillDTO, GetSkillDto, SkillDto, UpdateSkillDTO } from "../../dto/adminDTO/skill.dto.js";
import { ISkill } from "../../models/interfaces/ISkillModel.js";
export declare const mapCreateSkillDtoToSkillModel: (dto: CreateSkillDTO) => CreateSkillDTO;
export declare const mapSkillModelToSkillDto: (dto: any) => SkillDto;
export declare function mapSkillQuery(dto: any): GetSkillDto;
export declare const mapUpdateSkillDtoToSkillModel: (dto: Partial<UpdateSkillDTO>) => Partial<Pick<ISkill, "name" | "specialities" | "status">>;
//# sourceMappingURL=skill.mapper.d.ts.map