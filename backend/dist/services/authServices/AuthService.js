var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { mapCreateUserDtoToUserModel } from '../../mapper/authMapper/auth.mapper.js';
import bcrypt from 'bcryptjs';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { mapUserModelToUserDto } from '../../mapper/user.mapper.js';
import { genRandom } from '../../utils/cryptoGenerator.js';
import sendEmailOtp from '../../utils/sendOtp.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
let AuthService = class AuthService {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }
    async signup(userData) {
        const dto = mapCreateUserDtoToUserModel(userData);
        // Check if a verified user exists
        const verifiedUser = await this._userRepository.findOne({ email: dto.email, isVerified: true });
        if (verifiedUser) {
            throw new AppError(ERROR_MESSAGES.AUTH.ALREADY_EXIST, HttpStatus.CONFLICT);
        }
        // Check if an unverified user exists
        let user = await this._userRepository.findOne({
            email: dto.email,
            isVerified: false,
        });
        if (user) {
            // Update existing unverified user with new info
            user.firstName = dto.firstName;
            user.lastName = dto.lastName;
            user.password = await bcrypt.hash(dto.password, 10);
            user.phone = dto.phone;
            user = await this._userRepository.update(user._id.toString(), user);
        }
        else {
            // Create a new user
            dto.password = await bcrypt.hash(dto.password, 10);
            user = await this._userRepository.create(dto);
        }
        return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };
    }
    async login(userData) {
        // Normalize email to lowercase
        const email = userData.email.toLowerCase();
        const user = await this._userRepository.findOne({ email, isVerified: true });
        if (!user) {
            throw new AppError(ERROR_MESSAGES.AUTH.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const isPasswordMatch = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordMatch) {
            throw new AppError(ERROR_MESSAGES.AUTH.INCORRECT_PASSWORD, HttpStatus.UNAUTHORIZED);
        }
        const dto = mapUserModelToUserDto(user);
        return dto;
    }
    async forgotPassword(email) {
        const user = await this._userRepository.findOne({ email });
        if (!user) {
            throw new AppError(ERROR_MESSAGES.AUTH.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const tokenDetail = await genRandom();
        const token = tokenDetail.token;
        const expiry = new Date(tokenDetail.expiry);
        await this._userRepository.updateResetPassword(user._id, token, expiry);
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await sendEmailOtp(user.email, `Click here to reset your password: ${resetLink}`);
    }
    async resetPassword(token, newPassword) {
        const user = await this._userRepository.findByResetToken(token);
        if (!user) {
            throw new AppError(ERROR_MESSAGES.TOKEN.INVALID_TOKEN, HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this._userRepository.updatePassword(user._id, hashedPassword);
        await sendEmailOtp(user.email, 'Your password has been successfully reset.');
    }
    async verifyPassword(userId, password) {
        const user = await this._userRepository.findById(userId);
        if (!user) {
            throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        if (!user.password && user.googleId) {
            throw new AppError('Password verification is not applicable for Google-authenticated users.', HttpStatus.BAD_REQUEST);
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new AppError(ERROR_MESSAGES.AUTH.INCORRECT_PASSWORD, HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthService = __decorate([
    injectable(),
    __param(0, inject('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], AuthService);
export { AuthService };
//# sourceMappingURL=AuthService.js.map