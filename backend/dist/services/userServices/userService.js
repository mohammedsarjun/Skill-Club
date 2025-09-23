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
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { mapFreelancerDtoToUserModel, mapUserModelToUserDto } from "../../mapper/userMapper/user.mapper.js";
let userServices = class userServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async markUserVerified(id) {
        try {
            const result = await this.userRepository.update(id, { $set: { isVerified: true } });
        }
        catch (err) {
            // You can throw a custom error class if you have one
            throw new Error(`Failed to verify user: ${err.message}`);
        }
    }
    async selectRole(id, role) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError("User not found", HttpStatus.NOT_FOUND);
        }
        // If user already has the role, just return the DTO
        if (user.roles.includes(role)) {
            return mapUserModelToUserDto(user);
        }
        // Use repository to update roles & onboarding atomically
        const updatedUser = await this.userRepository.addRoleAndCompleteOnboarding(id, role);
        return mapUserModelToUserDto(updatedUser);
    }
    async createFreelancerProfile(id, freelancerData) {
        if (!id) {
            throw new Error("User ID is required");
        }
        if (!freelancerData || Object.keys(freelancerData).length === 0) {
            throw new Error("Freelancer data cannot be empty");
        }
        // Map DTO to model
        const dto = mapFreelancerDtoToUserModel(freelancerData);
        try {
            // Update user in the repository
            const updatedUser = await this.userRepository.update(id, dto);
            if (!updatedUser) {
                throw new Error(`User with id ${id} not found`);
            }
            return updatedUser;
        }
        catch (error) {
            console.error("Failed to create freelancer profile:", error);
            throw new Error("Failed to create freelancer profile");
        }
    }
};
userServices = __decorate([
    injectable(),
    __param(0, inject("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], userServices);
export { userServices };
//# sourceMappingURL=userService.js.map