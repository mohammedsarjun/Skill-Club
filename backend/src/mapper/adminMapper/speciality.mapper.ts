import {
  CreateSpecialityDTO,
  GetSpecialityDto,
  SpecialityDto,
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
  return {
    id: speciality._id.toString(),
    name: speciality.name,
    category: speciality.category?._id?.toString() ?? speciality.category?.toString() ?? "",
    categoryName: speciality.category ? speciality.category.name : "",
    status: speciality.status,
  };
};
