import { GetUserDto, updateUserStatusDto } from "../../../dto/adminDTO/adminUsers.dto.js";
export interface IAdminUserServices {
    getUserStats(): Promise<any>;
    getUsers(dto: GetUserDto): Promise<any>;
    getUserDetail(id: string): Promise<any>;
    updateUserStatus(dto: updateUserStatusDto): Promise<any>;
}
//# sourceMappingURL=IAdminUserServices.d.ts.map