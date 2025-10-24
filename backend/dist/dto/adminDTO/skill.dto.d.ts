import { Types } from 'mongoose';
export interface CreateSkillDTO {
    name: string;
    specialities: Types.ObjectId[];
    status: string;
}
export interface GetSkillDto {
    search?: string;
    page?: number;
    limit?: number;
    mode: string;
}
export interface UpdateSkillDTO {
    id: string;
    name?: string;
    specialties?: Types.ObjectId[];
    status?: string;
}
export interface SkillDto {
    id: string;
    name: string;
    specialities: {
        specialityId: string;
        specialityName: string;
    }[];
    status: string;
}
export interface SkillResponseDto {
    _id: string;
    name: string;
    specialities: {
        _id: Types.ObjectId;
        name: string;
    }[];
    status: string;
}
//# sourceMappingURL=skill.dto.d.ts.map