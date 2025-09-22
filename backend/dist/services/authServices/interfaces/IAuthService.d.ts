import { CreateUserDTO, GetUserDto } from "../../../dto/authDTO/auth.dto.js";
export interface IAuthService {
    signup(userData: CreateUserDTO): Promise<GetUserDto>;
    login(userData: any): Promise<any>;
}
//# sourceMappingURL=IAuthService.d.ts.map