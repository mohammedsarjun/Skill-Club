import { CreateUserDTO, GetUserDto } from "../../dto/authDTO/auth.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";
export declare const mapCreateUserDtoToUserModel: (dto: CreateUserDTO) => Pick<IUser, "firstName" | "lastName" | "email" | "phone" | "password"> & {
    agreement: boolean;
};
export declare const mapUserModelToGetUserDto: (modelData: IUser) => GetUserDto;
//# sourceMappingURL=auth.mapper.d.ts.map