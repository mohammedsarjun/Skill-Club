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
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';

@injectable()
export class userServices implements IUserServices {
  private _userRepository: IUserRepository;
  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async markUserVerified(id: string): Promise<void> {
    try {
      await this._userRepository.update(id, { $set: { isVerified: true } });
    } catch (err: any) {
      throw new AppError(`Failed to verify user: ${err.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async selectRole(id: string | undefined, role: string): Promise<UserDto> {
    const user = await this._userRepository.findById(id!);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user.roles.includes(role)) {
      return mapUserModelToUserDto(user);
    }

    const updatedUser = await this._userRepository.addRoleAndCompleteOnboarding(id!, role);

    return mapUserModelToUserDto(updatedUser!);
  }

  async createFreelancerProfile(id: string, freelancerData: any): Promise<IUser> {
    if (!id) {
      throw new AppError(ERROR_MESSAGES.USER.ID_REQUIRED, HttpStatus.BAD_REQUEST);
    }

    if (!freelancerData || Object.keys(freelancerData).length === 0) {
      throw new AppError('Freelancer data cannot be empty', HttpStatus.BAD_REQUEST);
    }


    try {
      const updatedUser = await this._userRepository.update(id, freelancerData);

      if (!updatedUser) {
        throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return updatedUser;
    } catch (error: any) {
      throw new AppError(ERROR_MESSAGES.FREELANCER.FAILED_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createClientProfile(
    id: string,
    clientData: ClientProfileDto,
  ): Promise<ClientProfileUpdateResponseDto> {
    if (!id) {
      throw new AppError(ERROR_MESSAGES.USER.ID_REQUIRED, HttpStatus.BAD_REQUEST);
    }

    try {
      const updatedUser = await this._userRepository.update(id, clientData);

      if (!updatedUser) {
        throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const dto = mapUserModelToClientProfileUpdateResponseDto(updatedUser);
      return dto;
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.CLIENT.FAILED_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async switchRole(id: string): Promise<UserDto> {
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user?.roles && user?.roles.length < 2) {
      throw new AppError(`User Didn't Have Enough Role`, HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this._userRepository.update(id, {
      activeRole: user.activeRole === 'client' ? 'freelancer' : 'client',
    });

    const dto =mapUserModelToUserDto(updatedUser!)

    return dto
  }

  async me(id: string): Promise<UserDto> {
    const user=await this._userRepository.findById(id);

      if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const dto =mapUserModelToUserDto(user)

    return dto
  }
}
