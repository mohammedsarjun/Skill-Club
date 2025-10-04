import { injectable, inject } from 'tsyringe';
import { IUserServices } from './interfaces/IUserServices.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import {
  mapFreelancerDtoToUserModel,
  mapUserModelToClientProfileUpdateResponseDto,
  mapUserModelToUserDto,
} from '../../mapper/userMapper/user.mapper.js';
import {
  ClientProfileDetailDTO,
  ClientProfileDto,
  ClientProfileUpdateResponseDto,
  UserDto,
} from '../../dto/userDTO/user.dto.js';
import { IUser } from '../../models/interfaces/IUserModel.js';

@injectable()
export class userServices implements IUserServices {
  private userRepository: IUserRepository;
  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async markUserVerified(id: string): Promise<void> {
    try {
      await this.userRepository.update(id, { $set: { isVerified: true } });
    } catch (err: any) {
      throw new AppError(`Failed to verify user: ${err.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async selectRole(id: string | undefined, role: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id!);
    if (!user) {
      throw new AppError('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.roles.includes(role)) {
      return mapUserModelToUserDto(user);
    }

    const updatedUser = await this.userRepository.addRoleAndCompleteOnboarding(id!, role);

    return mapUserModelToUserDto(updatedUser!);
  }

  async createFreelancerProfile(id: string, freelancerData: any): Promise<IUser> {
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
    } catch (error: any) {
      console.error('Failed to create freelancer profile:', error);
      throw new AppError('Failed to create freelancer profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createClientProfile(
    id: string,
    clientData: ClientProfileDto,
  ): Promise<ClientProfileUpdateResponseDto> {
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
    } catch (error) {
      throw new AppError('Failed to create client profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async switchRole(id: string): Promise<UserDto> {
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

    const dto =mapUserModelToUserDto(updatedUser!)

    return dto
  }

  async me(id: string): Promise<UserDto> {
    const user=await this.userRepository.findById(id);

      if (!user) {
      throw new AppError(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const dto =mapUserModelToUserDto(user)

    return dto
  }
}
