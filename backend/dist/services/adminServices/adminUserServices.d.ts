import { IAdminUserServices } from './interfaces/IAdminUserServices.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import { GetUserDto } from '../../dto/adminDTO/adminUsers.dto.js';
export declare class AdminUserServices implements IAdminUserServices {
    private _userRepository;
    constructor(userRepository: IUserRepository);
    getUserStats(): Promise<any>;
    getUsers(filterData: GetUserDto): Promise<any>;
}
//# sourceMappingURL=adminUserServices.d.ts.map