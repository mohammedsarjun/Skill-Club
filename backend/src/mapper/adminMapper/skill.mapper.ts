import { Types } from "mongoose";
import { CreateSkillDTO, GetSkillDto, SkillDto, UpdateSkillDTO } from "../../dto/adminDTO/skill.dto.js";
import { ISkill } from "../../models/interfaces/ISkillModel.js";


export const mapCreateSkillDtoToSkillModel = (
  dto: CreateSkillDTO
): CreateSkillDTO => {
  return {
    name: dto.name,
    specialities:dto.specialities.map(id => new Types.ObjectId(id)),
    status: dto.status,
  };
};


export const mapSkillModelToSkillDto = (
  dto: any
): SkillDto=> {
  return {
    id:dto._id.toString(),
    name: dto.name,
    specialities:dto.specialities.map((spec:any) => ({id:spec._id.toString(),name:spec.name})),
    status: dto.status,
  };
};


export function mapSkillQuery(dto: any): GetSkillDto {
  return {
    search: dto.search || "",
    page: dto.page ? Number(dto.page) : 1,
    limit: dto.limit ? Number(dto.limit) : 10,
    mode: dto.mode,
  };
}


export const mapUpdateSkillDtoToSkillModel = (
  dto: Partial<UpdateSkillDTO> // <- make it partial
): Partial<Pick<ISkill, "name" | "specialities" | "status">> => {
  const updatedData: Partial<Pick<ISkill, "name" | "specialities" | "status">> = {};

  if (dto.name !== undefined) updatedData.name = dto.name;
  if (dto.specialties !== undefined) updatedData.specialities = dto.specialties;
  if (dto.status !== undefined) updatedData.status = dto.status;

  return updatedData;
};



