import type { IAuthService } from "./interfaces/IAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import "../../config/container.js";
import { CreateUserDTO, GetUserDto } from "../../dto/authDTO/auth.dto.js";
import { UserDto } from "../../dto/userDTO/user.dto.js";
export declare class AuthService implements IAuthService {
    private _userRepository;
    constructor(userRepository: IUserRepository);
    signup(userData: CreateUserDTO): Promise<GetUserDto>;
    login(userData: any): Promise<UserDto>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=AuthService.d.ts.map