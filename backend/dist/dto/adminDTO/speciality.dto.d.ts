import { Types } from 'mongoose';
export interface CreateSpecialityDTO {
  name: string;
  category: Types.ObjectId;
  status: string;
}
export interface UpdateSpecialityDTO {
  id: string;
  name?: string;
  category?: Types.ObjectId;
  status?: string;
}
export interface GetSpecialityDto {
  search?: string;
  page?: number;
  limit?: number;
  categoryFilter?: string;
  mode: string;
}
export interface SpecialityDto {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  status: string;
}
export interface PaginatedSpecialityDto {
  data: SpecialityDto[];
  total: number;
  page: number;
  limit: number;
}
//# sourceMappingURL=speciality.dto.d.ts.map
