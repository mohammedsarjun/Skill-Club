import { CreateUserDTO, GetUserDto } from "../../../dto/authDTO/auth.dto.js";
export interface IAuthService {
    signup(userData: CreateUserDTO): Promise<GetUserDto>;
    login(userData: any): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    verifyPassword(userId: string, password: string): Promise<void>;
}
//# sourceMappingURL=IAuthService.d.ts.map