import { AdminUserDto, AdminUserStatsDto, GetUserDto } from "../../dto/adminDTO/adminUsers.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";

export const mapUserModelDtoToAdminUserStatsDto = (dto:AdminUserStatsDto): AdminUserStatsDto => {
  return {
    totalUsers: dto.totalUsers,
    totalClients: dto.totalClients,
    totalFreelancers: dto.totalFreelancers,
  };
};

export function  mapUserQuery(dto: any): GetUserDto {
  return {
    search: dto.search || "",
    page: dto.page ? Number(dto.page) : 1,
    limit: dto.limit ? Number(dto.limit) : 10,
    filters:{role:dto?.filters?.role,status:dto?.filters?.status}
  };
}


export function mapUserModelDtoToAdminUserDto(dto: Partial<IUser>): AdminUserDto {
  return {
    id:dto._id?.toString()!,
    name:dto.firstName+dto.lastName!,
    email:dto.email!,
    roles:dto.roles!,
    status:dto.isBlocked?"blocked":"active"
  };
}

