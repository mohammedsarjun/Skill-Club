
//Request Dto
export interface CreateCategoryDTO {
  name: string;
  description:string;
  status:string
}


export interface GetCategoryDto{
  search?:string;
  page?:number;
  limit?:number;
}

//Response Dto
export interface CategoryDto {
  id: string;
  name: string;
  description: string;
  status: string;
}

export interface PaginatedCategoryDto {
  data: CategoryDto[];
  total: number;
  page: number;
  limit: number;
}
