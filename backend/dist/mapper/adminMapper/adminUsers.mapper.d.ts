import { AdminUserDto, AdminUserStatsDto, GetUserDto } from "../../dto/adminDTO/adminUsers.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";
export declare const mapUserModelDtoToAdminUserStatsDto: (dto: AdminUserStatsDto) => AdminUserStatsDto;
export declare function mapUserQuery(dto: any): GetUserDto;
export declare function mapUserModelDtoToAdminUserDto(dto: Partial<IUser>): AdminUserDto;
//# sourceMappingURL=adminUsers.mapper.d.ts.map