import { CreateUserDTO } from "../../../dto/authDTO/auth.dto.js";
export interface IAuthService {
    signup(userData: CreateUserDTO): Promise<{
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }>;
    login(userData: any): Promise<any>;
}
//# sourceMappingURL=IAuthService.d.ts.map