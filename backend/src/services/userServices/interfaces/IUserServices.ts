import {
    AddressDTO,
  ClientProfileDetailDTO,
  ClientProfileUpdateResponseDto,
  UserDto,
  UserProfileDto,
} from '../../../dto/userDTO/user.dto.js';
import { IUser } from '../../../models/interfaces/IUserModel.js';

export interface IUserServices {
  markUserVerified(email: string): Promise<void>;
  selectRole(id: string | undefined, role: string): Promise<UserDto>;
  createFreelancerProfile(id: string | undefined, freelancerData: Partial<IUser>): Promise<IUser>;
  createClientProfile(
    id: string,
    clientData: ClientProfileDetailDTO,
  ): Promise<ClientProfileUpdateResponseDto>;
  switchRole(id: string): Promise<UserDto>;
  me(id: string): Promise<UserDto>;
  getProfile(userId: string): Promise<UserProfileDto>;
  getAddress(userId: string): Promise<AddressDTO|null>
  createActionVerification(userId:string,actionType:"emailChange" | "passwordReset" | "phoneUpdate" ,actionData:Record<string,any>):Promise<void>
}
