import { IUserServices } from './interfaces/IUserServices.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import {
  AddressDTO,
  ClientProfileDetailDTO,
  ClientProfileUpdateResponseDto,
  UserDto,
  UserProfileDto,
} from '../../dto/userDTO/user.dto.js';
import { IUser } from '../../models/interfaces/IUserModel.js';
import type { IActionVerificationRepository } from '../../repositories/interfaces/IActionVerificationRepository.js';
export declare class userServices implements IUserServices {
  private _userRepository;
  private _actionVerificationRepository;
  constructor(
    userRepository: IUserRepository,
    actionVerificationRepository: IActionVerificationRepository,
  );
  getProfile(userId: string): Promise<UserProfileDto>;
  markUserVerified(id: string): Promise<void>;
  selectRole(id: string | undefined, role: string): Promise<UserDto>;
  createFreelancerProfile(id: string, freelancerData: Partial<IUser>): Promise<IUser>;
  createClientProfile(
    id: string,
    clientData: ClientProfileDetailDTO,
  ): Promise<ClientProfileUpdateResponseDto>;
  switchRole(id: string): Promise<UserDto>;
  me(id: string): Promise<UserDto>;
  getAddress(userId: string): Promise<AddressDTO | null>;
  createActionVerification(
    userId: string,
    actionType: 'emailChange' | 'passwordReset' | 'phoneUpdate',
    actionData: Record<string, any>,
  ): Promise<void>;
}
//# sourceMappingURL=userService.d.ts.map
