import { Types } from "mongoose";

//Request Dto
export interface CreateSkillDTO {
  name: string;
  specialties:string[];
  status:string
}


export interface GetSkillDto{
  search?:string;
  page?:number;
  limit?:number;
  mode:string
}

export interface UpdateSkillDTO {
  id:string;
  name?: string;
  specialties?:Types.ObjectId[];
  status?:string;
}




//Response Dto
export interface SkillDto {
  id: string;
  name: string;
  specialities: {specialityId:string,specialityName:string}[];
  status: string;
}


// export interface PaginatedSpecialityDto {
//   data: SpecialityDto[];
//   total: number;
//   page: number;
//   limit: number;
// }