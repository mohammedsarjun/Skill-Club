import { GetUserDto } from "../../../dto/adminDTO/adminUsers.dto.js"

export interface IAdminUserServices{
    getUserStats():Promise<any>
    getUsers(dto:GetUserDto):Promise<any>
}