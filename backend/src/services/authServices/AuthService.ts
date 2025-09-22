import type { IAuthService } from "./interfaces/IAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { injectable, inject } from "tsyringe";
import "../../config/container.js"
import { CreateUserDTO, GetUserDto } from "../../dto/authDTO/auth.dto.js";
import { mapCreateUserDtoToUserModel } from "../../mapper/authMapper/auth.mapper.js";
import bcrypt from "bcryptjs";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
@injectable()
export class AuthService implements IAuthService {
    private userRepository: IUserRepository
    constructor(@inject("IUserRepository") userRepository: IUserRepository) {
        this.userRepository = userRepository
    }
    async signup(userData: CreateUserDTO): Promise<GetUserDto> {
        const dto = mapCreateUserDtoToUserModel(userData);

        // Check if a verified user exists
        const verifiedUser = await this.userRepository.findOne({email: dto.email ,isVerified: true});

        if (verifiedUser) {
            throw new AppError("Email or phone number already exists", HttpStatus.CONFLICT);
        }



        // Check if an unverified user exists
        let user = await this.userRepository.findOne({
             email: dto.email ,isVerified: false
        });

        

        if (user) {
            // Update existing unverified user with new info
            user.firstName = dto.firstName;
            user.lastName = dto.lastName;
            user.password = await bcrypt.hash(dto.password, 10);
            user.phone=dto.phone
            user = await this.userRepository.update(user._id.toString(),user);
    
           
        } else {
            // Create a new user
            dto.password = await bcrypt.hash(dto.password, 10);
            user = await this.userRepository.create(dto);
        }

        return {
            id: user!._id.toString(),
            firstName: user!.firstName,
            lastName: user!.lastName,
            email: user!.email,
            phone: user!.phone,
        };
    }

    login(userData: any): Promise<any> {
        return Promise.resolve()
    }
}