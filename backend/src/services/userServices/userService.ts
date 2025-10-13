import { injectable, inject } from 'tsyringe';
import { IUserServices } from './interfaces/IUserServices.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import {
  mapClientDtoToUserModel,
  mapFreelancerDtoToUserModel,
  mapUserModelToAddressDto,
  mapUserModelToClientProfileUpdateResponseDto,
  mapUserModelToUserDto,
  mapUserModelToUserProfileDto,
} from '../../mapper/user.mapper.js';
import {
  AddressDTO,
  ClientProfileDetailDTO,
  ClientProfileUpdateResponseDto,
  UserDto,
  UserProfileDto,
} from '../../dto/userDTO/user.dto.js';
import { IUser } from '../../models/interfaces/IUserModel.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
import { mapActionVerificationToCreateActionVerification } from '../../mapper/actionVerification.mapper.js';
import type { IActionVerificationRepository } from '../../repositories/interfaces/IActionVerificationRepository.js';

@injectable()
export class userServices implements IUserServices {
  private _userRepository: IUserRepository;
  private _actionVerificationRepository: IActionVerificationRepository;
  constructor(
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('IActionVerificationRepository')
    actionVerificationRepository: IActionVerificationRepository,
  ) {
    this._userRepository = userRepository;
    this._actionVerificationRepository = actionVerificationRepository;
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return mapUserModelToUserProfileDto(user);
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

  async createFreelancerProfile(id: string, freelancerData: Partial<IUser>): Promise<IUser> {

          const dto = mapFreelancerDtoToUserModel(freelancerData);
    if (!id) {
      throw new AppError(ERROR_MESSAGES.USER.ID_REQUIRED, HttpStatus.BAD_REQUEST);
    }

    if (!dto || Object.keys(dto).length === 0) {
      throw new AppError('Freelancer data cannot be empty', HttpStatus.BAD_REQUEST);
    }

    try {
      const updatedUser = await this._userRepository.createFreelancerProfile(id, dto);
      console.log(updatedUser);
      if (!updatedUser) {
        throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return updatedUser;
    } catch (error: any) {
      console.log(error);
      throw new AppError(ERROR_MESSAGES.FREELANCER.FAILED_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createClientProfile(
    id: string,
    clientData: ClientProfileDetailDTO,
  ): Promise<ClientProfileUpdateResponseDto> {

   
    if (!id) {
      throw new AppError(ERROR_MESSAGES.USER.ID_REQUIRED, HttpStatus.BAD_REQUEST);
    }

    try {
      const clientdto = mapClientDtoToUserModel(clientData) 
      const updatedUser = await this._userRepository.update(id, clientdto);

      if (!updatedUser) {
        throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const clientResponseDto = mapUserModelToClientProfileUpdateResponseDto(updatedUser);
      return clientResponseDto;
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

    const dto = mapUserModelToUserDto(updatedUser!);

    return dto;
  }

  async me(id: string): Promise<UserDto> {
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const dto = mapUserModelToUserDto(user);

    return dto;
  }

  async getAddress(userId: string): Promise<AddressDTO | null> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (!user.address) {
      return null;
    }

    return mapUserModelToAddressDto(user);
  }

  async createActionVerification(
    userId: string,
    actionType:"emailChange" | "passwordReset" | "phoneUpdate" ,
    actionData: Record<string, any>,
  ): Promise<void> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const dto = mapActionVerificationToCreateActionVerification({ userId, actionType, actionData });

    this._actionVerificationRepository.createActionVerificaion(dto)
  }
}
