import { IAdminUserServices } from "./interfaces/IAdminUserServices.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
export declare class AdminUserServices implements IAdminUserServices {
    private _userRepository;
    constructor(userRepository: IUserRepository);
    getUserStats(): Promise<any>;
}
//# sourceMappingURL=adminUserServices.d.ts.map