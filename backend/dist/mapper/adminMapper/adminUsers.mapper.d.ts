import {
  AdminUserDto,
  AdminUserStatsDto,
  GetUserDto,
  updateUserStatusDto,
  UserDetailDto,
} from '../../dto/adminDTO/adminUsers.dto.js';
import { IUser } from '../../models/interfaces/IUserModel.js';
export declare const mapUserModelDtoToAdminUserStatsDto: (
  dto: AdminUserStatsDto,
) => AdminUserStatsDto;
export declare function mapUserQuery(dto: any): GetUserDto;
export declare function mapUpdateUserStatusToUserModel(dto: any): updateUserStatusDto;
export declare function mapUserModelDtoToAdminUserDto(dto: Partial<IUser>): AdminUserDto;
export declare function mapUserToUserDetailDto(user: Partial<IUser>): UserDetailDto;
//# sourceMappingURL=adminUsers.mapper.d.ts.map
