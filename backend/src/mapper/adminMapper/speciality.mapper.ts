import {
  CreateSpecialityDTO,
  GetSpecialityDto,
  SpecialityDto,
  UpdateSpecialityDTO,
} from "../../dto/adminDTO/speciality.dto.js";
import { ISpeciality } from "../../models/interfaces/ISpecialityModel.js";

export const mapCreateSpecialityDtoToSpecialityModel = (
  dto: CreateSpecialityDTO
): Pick<ISpeciality, "name" | "category" | "status"> => {
  return {
    name: dto.name,
    category: dto.category,
    status: dto.status,
  };
};

export const mapUpdateSpecialityDtoToSpecialityModel = (
  dto: Partial<UpdateSpecialityDTO> // <- make it partial
): Partial<Pick<ISpeciality, "name" | "category" | "status">> => {
  const updatedData: Partial<Pick<ISpeciality, "name" | "category" | "status">> = {};

  if (dto.name !== undefined) updatedData.name = dto.name;
  if (dto.category !== undefined) updatedData.category = dto.category;
  if (dto.status !== undefined) updatedData.status = dto.status;

  return updatedData;
};

export function mapSpecialityQuery(dto: any): GetSpecialityDto {
  return {
    search: dto.search || "",
    page: dto.page ? Number(dto.page) : 1,
    limit: dto.limit ? Number(dto.limit) : 10,
    mode: dto.mode,
  };
}

export const mapSpecialityModelToSpecialityDto = (
  speciality: any 
): SpecialityDto => {
  console.log(speciality)
  return {
    id: speciality._id.toString(),
    name: speciality.name,
    category: speciality.category?._id?.toString() ?? speciality.category?.toString() ?? "",
    categoryName: speciality.category ? speciality.category.name : "",
    status: speciality.status,
  };
};
