import { Types } from "mongoose";
export const mapCreateSkillDtoToSkillModel = (dto) => {
    return {
        name: dto.name,
        specialities: dto.specialties.map(id => new Types.ObjectId(id)),
        status: dto.status,
    };
};
export const mapSkillModelToSkillDto = (dto) => {
    return {
        id: dto._id.toString(),
        name: dto.name,
        specialities: dto.specialities.map((spec) => ({ id: spec._id.toString(), name: spec.name })),
        status: dto.status,
    };
};
export function mapSkillQuery(dto) {
    return {
        search: dto.search || "",
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
        mode: dto.mode,
    };
}
export const mapUpdateSkillDtoToSkillModel = (dto // <- make it partial
) => {
    const updatedData = {};
    if (dto.name !== undefined)
        updatedData.name = dto.name;
    if (dto.specialties !== undefined)
        updatedData.specialities = dto.specialties;
    if (dto.status !== undefined)
        updatedData.status = dto.status;
    return updatedData;
};
//# sourceMappingURL=skill.mapper.js.map