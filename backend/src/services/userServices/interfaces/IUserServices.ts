import { SelectRoleDto } from "../../../dto/userDTO/user.dto.js";

export interface IUserServices{
    markUserVerified(email:string):Promise<void>;
    selectRole(id:string|undefined,role:string):Promise<SelectRoleDto>;
}