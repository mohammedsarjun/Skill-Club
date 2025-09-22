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
import { injectable, inject } from "tsyringe";
import "../../config/container.js";
import { mapCreateUserDtoToUserModel } from "../../mapper/authMapper/auth.mapper.js";
import bcrypt from "bcryptjs";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async signup(userData) {
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
            user.password = await bcrypt.hash(dto.password, 10);
            user.phone = dto.phone;
            user = await this.userRepository.update(user._id.toString(), user);
        }
        else {
            // Create a new user
            dto.password = await bcrypt.hash(dto.password, 10);
            user = await this.userRepository.create(dto);
        }
        return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };
    }
    login(userData) {
        return Promise.resolve();
    }
};
AuthService = __decorate([
    injectable(),
    __param(0, inject("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], AuthService);
export { AuthService };
//# sourceMappingURL=AuthService.js.map