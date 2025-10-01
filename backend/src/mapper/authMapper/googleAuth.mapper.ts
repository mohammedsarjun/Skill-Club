import { CreateUserDTO, GetUserDto } from "../../dto/authDTO/auth.dto.js";
import { CreateGoogleUserDTO } from "../../dto/authDTO/googleAuth.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";

export const mapCreateGoogleUserDtoToUserModel = (
  dto: CreateGoogleUserDTO
  
):  Pick<IUser, "firstName" | "lastName" | "email"  | "avatar" |"googleId"> => {
  return {
    googleId:dto.sub,
    firstName: dto.given_name,
    lastName: dto.family_name,
    email: dto.email,
    avatar:dto.picture
  };
};


