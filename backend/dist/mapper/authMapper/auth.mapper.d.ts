import { CreateUserDTO, GetUserDto } from '../../dto/authDTO/auth.dto';
import { IUser } from '../../models/interfaces/i-user.model';
export declare const mapCreateUserDtoToUserModel: (dto: CreateUserDTO) => Pick<IUser, "firstName" | "lastName" | "email" | "phone" | "password"> & {
    agreement: boolean;
};
export declare const mapUserModelToGetUserDto: (modelData: IUser) => GetUserDto;
//# sourceMappingURL=auth.mapper.d.ts.map