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
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { mapUserModelToClientProfileUpdateResponseDto, mapUserModelToUserDto, } from '../../mapper/userMapper/user.mapper.js';
let userServices = class userServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async markUserVerified(id) {
        try {
            await this.userRepository.update(id, { $set: { isVerified: true } });
        }
        catch (err) {
            throw new AppError(`Failed to verify user: ${err.message}`, HttpStatus.UNAUTHORIZED);
        }
    }
    async selectRole(id, role) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', HttpStatus.NOT_FOUND);
        }
        if (user.roles.includes(role)) {
            return mapUserModelToUserDto(user);
        }
        const updatedUser = await this.userRepository.addRoleAndCompleteOnboarding(id, role);
        return mapUserModelToUserDto(updatedUser);
    }
    async createFreelancerProfile(id, freelancerData) {
        if (!id) {
            throw new AppError('User ID is required', HttpStatus.BAD_REQUEST);
        }
        if (!freelancerData || Object.keys(freelancerData).length === 0) {
            throw new AppError('Freelancer data cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const updatedUser = await this.userRepository.update(id, freelancerData);
            if (!updatedUser) {
                throw new AppError(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return updatedUser;
        }
        catch (error) {
            console.error('Failed to create freelancer profile:', error);
            throw new AppError('Failed to create freelancer profile', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createClientProfile(id, clientData) {
        if (!id) {
            throw new AppError('User ID is required', HttpStatus.BAD_REQUEST);
        }
        try {
            const updatedUser = await this.userRepository.update(id, clientData);
            if (!updatedUser) {
                throw new AppError(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
            }
            const dto = mapUserModelToClientProfileUpdateResponseDto(updatedUser);
            return dto;
        }
        catch (error) {
            throw new AppError('Failed to create client profile', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async switchRole(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        if (user?.roles && user?.roles.length < 2) {
            throw new AppError(`User Didn't Have Enough Role`, HttpStatus.BAD_REQUEST);
        }
        const updatedUser = await this.userRepository.update(id, {
            activeRole: user.activeRole === 'client' ? 'freelancer' : 'client',
        });
        const dto = mapUserModelToUserDto(updatedUser);
        return dto;
    }
    async me(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        const dto = mapUserModelToUserDto(user);
        return dto;
    }
};
userServices = __decorate([
    injectable(),
    __param(0, inject('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], userServices);
export { userServices };
//# sourceMappingURL=userService.js.map