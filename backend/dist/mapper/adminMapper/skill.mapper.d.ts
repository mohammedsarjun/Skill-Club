import { CreateSkillDTO, GetSkillDto, SkillDto, UpdateSkillDTO } from '../../dto/adminDTO/skill.dto';
import { ISkill } from '../../models/interfaces/i-skill.model';
export declare const mapCreateSkillDtoToSkillModel: (dto: CreateSkillDTO) => CreateSkillDTO;
export declare const mapSkillModelToSkillDto: (dto: Omit<ISkill, "specialities"> & {
    specialities: {
        _id: string;
        name: string;
    }[];
}) => SkillDto;
export declare const mapSkillModelToAddSkillDto: (dto: Omit<ISkill, "specialities"> & {
    specialities: {
        _id: string;
        name: string;
    }[];
}) => SkillDto;
export declare function mapSkillQuery(dto: GetSkillDto): GetSkillDto;
export declare const mapUpdateSkillDtoToSkillModel: (dto: Partial<UpdateSkillDTO>) => Partial<Pick<ISkill, "name" | "specialities" | "status">>;
//# sourceMappingURL=skill.mapper.d.ts.map