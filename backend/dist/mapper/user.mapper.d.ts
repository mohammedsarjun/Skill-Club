import { AddressDTO, ClientProfileDetailDTO, ClientProfileDto, ClientProfileUpdateResponseDto, UserDto, UserProfileDto } from '../dto/userDTO/user.dto.js';
import { IUser } from '../models/interfaces/IUserModel.js';
export declare const mapUserModelToUserDto: (modelData: IUser) => UserDto;
export declare const mapUserModelToUserProfileDto: (modelData: IUser) => UserProfileDto;
export declare function mapFreelancerDtoToUserModel(raw: any): Partial<IUser>;
export declare function mapClientDtoToUserModel(raw: ClientProfileDetailDTO): ClientProfileDto;
export declare function mapUserModelToClientProfileUpdateResponseDto(raw: IUser): ClientProfileUpdateResponseDto;
export declare function mapUserModelToAddressDto(raw: IUser): AddressDTO;
//# sourceMappingURL=user.mapper.d.ts.map