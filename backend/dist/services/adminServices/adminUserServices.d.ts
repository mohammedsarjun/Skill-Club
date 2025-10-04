import { IAdminUserServices } from './interfaces/IAdminUserServices.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import { GetUserDto, updateUserStatusDto, UserDetailDto } from '../../dto/adminDTO/adminUsers.dto.js';
export declare class AdminUserServices implements IAdminUserServices {
    private _userRepository;
    constructor(userRepository: IUserRepository);
    getUserStats(): Promise<any>;
    getUsers(filterData: GetUserDto): Promise<any>;
    getUserDetail(id: string): Promise<UserDetailDto>;
    updateUserStatus(dto: updateUserStatusDto): Promise<void>;
}
//# sourceMappingURL=adminUserServices.d.ts.map