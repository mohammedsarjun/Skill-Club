import type { IAuthService } from "./interfaces/IAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { injectable, inject } from "tsyringe";
import "../../config/container.js"
import { CreateUserDTO, GetUserDto } from "../../dto/authDTO/auth.dto.js";
import { mapCreateUserDtoToUserModel } from "../../mapper/authMapper/auth.mapper.js";
import bcrypt from "bcryptjs";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { UserDto } from "../../dto/userDTO/user.dto.js";
import { mapUserModelToUserDto } from "../../mapper/userMapper/user.mapper.js";
import { genRandom } from "../../utils/cryptoGenerator.js";
import sendEmailOtp from "../../utils/sendOtp.js";
@injectable()
export class AuthService implements IAuthService {
    private userRepository: IUserRepository
    constructor(@inject("IUserRepository") userRepository: IUserRepository) {
        this.userRepository = userRepository
    }
    async signup(userData: CreateUserDTO): Promise<GetUserDto> {
        const dto = mapCreateUserDtoToUserModel(userData);

        // Check if a verified user exists
        const verifiedUser = await this.userRepository.findOne({ email: dto.email, isVerified: true });

        if (verifiedUser) {
            throw new AppError("Email or phone number already exists", HttpStatus.CONFLICT);
        }



        // Check if an unverified user exists
        let user = await this.userRepository.findOne({
            email: dto.email, isVerified: false
        });



        if (user) {
            // Update existing unverified user with new info
            user.firstName = dto.firstName;
            user.lastName = dto.lastName;
            user.password = await bcrypt.hash(dto.password!, 10);
            user.phone = dto.phone!
            user = await this.userRepository.update(user._id.toString(), user);


        } else {
            // Create a new user
            dto.password = await bcrypt.hash(dto.password!, 10);
            user = await this.userRepository.create(dto);
        }

        return {
            id: user!._id.toString(),
            firstName: user!.firstName,
            lastName: user!.lastName,
            email: user!.email,
            phone: user!.phone!,
        };
    }

    async login(userData: any): Promise<UserDto> {
        // Normalize email to lowercase
        const email = userData.email.toLowerCase();

        const user = await this.userRepository.findOne({ email, isVerified: true });

        if (!user) {
            throw new AppError("User with this email does not exist", HttpStatus.NOT_FOUND);
        }

        const isPasswordMatch = await bcrypt.compare(userData.password, user.password!);
        if (!isPasswordMatch) {
            throw new AppError("Incorrect password", HttpStatus.UNAUTHORIZED);
        }

        const dto = mapUserModelToUserDto(user)
        return dto
    }

    async forgotPassword(email: string): Promise<void> {
        // 1. Find the user
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new AppError("Email does not exist", HttpStatus.NOT_FOUND);
        }

        // 2. Generate token and expiry
        const tokenDetail = await genRandom();
        const token = tokenDetail.token;
        const expiry = new Date(tokenDetail.expiry);

        // 3. Update user atomically via repository
        await this.userRepository.updateResetPassword(user._id, token, expiry);

        // 4. Send reset link email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await sendEmailOtp(user.email, `Click here to reset your password: ${resetLink}`);
    }



async resetPassword(token: string, newPassword: string): Promise<void> {
    // 1. Find the user by token and expiry
        console.log(token)
    const user = await this.userRepository.findByResetToken(token);
    console.log(user)

    if (!user) {
        throw new AppError("Invalid or expired token.", HttpStatus.BAD_REQUEST);
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Update password and clear reset token atomically
    await this.userRepository.updatePassword(user._id, hashedPassword);

    // 4. Optional: send confirmation email instead of reset link
    await sendEmailOtp(
        user.email,
        "Your password has been successfully reset."
    );
}

}