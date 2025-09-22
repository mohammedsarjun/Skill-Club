
//Request Dto

export interface CreateSpecialityDTO {
  name: string;
  category:string;
  status:string
}

export interface UpdateSpecialityDTO {
  id:string;
  name?: string;
  category?:string;
  status?:string;
}


export interface GetSpecialityDto{
  search?:string;
  page?:number;
  limit?:number;
  mode:string
}


//Response Dto
export interface SpecialityDto {
  id: string;
  name: string;
  category: string;
  categoryName:string;
  status: string;
}

export interface PaginatedSpecialityDto {
  data: SpecialityDto[];
  total: number;
  page: number;
  limit: number;
}
