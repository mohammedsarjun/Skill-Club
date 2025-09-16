import type { IAuthService } from "./interfaces/IAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { injectable, inject } from "tsyringe";
import "../../config/container.js"
import { CreateUserDTO } from "../../dto/authDTO/auth.dto.js";
@injectable()
export class AuthService implements IAuthService {
    private userRepository: IUserRepository
    constructor(@inject("IUserRepository") userRepository: IUserRepository) {
        this.userRepository = userRepository
    }
    async signup(userData: CreateUserDTO): Promise<any> {
        const result = await this.userRepository.create(userData)

        return {
            _id:result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            phone: result.phone,
            password: result.password,
        }
    }

    login(userData: any): Promise<any> {
        return Promise.resolve()
    }
}