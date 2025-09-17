import type { IAuthService } from "./interfaces/IAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import "../../config/container.js";
import { CreateUserDTO } from "../../dto/authDTO/auth.dto.js";
export declare class AuthService implements IAuthService {
    private userRepository;
    constructor(userRepository: IUserRepository);
    signup(userData: CreateUserDTO): Promise<any>;
    login(userData: any): Promise<any>;
}
//# sourceMappingURL=AuthService.d.ts.map