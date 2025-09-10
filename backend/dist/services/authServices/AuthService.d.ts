import type { IAuthService } from "./interfaces/IAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import "../../config/container.js";
export declare class AuthService implements IAuthService {
    private userRepository;
    constructor(userRepository: IUserRepository);
    signup(userData: any): Promise<any>;
    login(userData: any): Promise<any>;
}
//# sourceMappingURL=AuthService.d.ts.map