import { CreateUserDTO } from "../../dto/authDTO/auth.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";

export const mapCreateUserDtoToUserModel = (
  dto: CreateUserDTO
  
):  Pick<IUser, "firstName" | "lastName" | "email" | "phone" | "password"> & {agreement:boolean} => {
  return {
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    phone: dto.phone,
    password: dto.password, 
    agreement:dto.agreement
  };
};
