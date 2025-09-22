import { SelectRoleDto } from "../../dto/userDTO/user.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";



export const mapUserModelToSelectRolesDto = (
  modelData: IUser
  
):  SelectRoleDto=> {
  return {
    userId:modelData._id.toString(),
    roles:modelData.roles
  };
};

