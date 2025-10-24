import { FreelancerRawDto, IAddress } from 'src/dto/freelancer.dto';
import { AddressDTO, ClientProfileDetailDTO, ClientProfileDto, ClientProfileUpdateResponseDto, UserDto, UserProfileDto } from '../dto/user.dto';
import { IExperience, IUser } from '../models/interfaces/i-user.model';
export declare const mapUserModelToUserDto: (modelData: IUser) => UserDto;
export declare const mapUserModelToUserProfileDto: (modelData: IUser) => UserProfileDto;
export declare function mapFreelancerDtoToUserModel(raw: FreelancerRawDto): Partial<IUser>;
export declare function mapClientDtoToUserModel(raw: ClientProfileDetailDTO): ClientProfileDto;
export declare function mapUserModelToClientProfileUpdateResponseDto(raw: IUser): ClientProfileUpdateResponseDto;
export declare function mapUserModelToAddressDto(raw: IUser): AddressDTO;
export declare function mapAddressDtoToUserModel(address: AddressDTO): IAddress;
export declare function UserDetailDtoToUserModel(raw: Partial<UserProfileDto>): UserProfileDto;
export declare function mapWorkHistoryToUserModel(exp: IExperience): IExperience;
//# sourceMappingURL=user.mapper.d.ts.map