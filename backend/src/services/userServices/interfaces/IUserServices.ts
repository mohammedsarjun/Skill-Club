import { ClientProfileDto, ClientProfileUpdateResponseDto, UserDto } from "../../../dto/userDTO/user.dto.js";
import {  IUser } from "../../../models/interfaces/IUserModel.js";

export interface IUserServices{
    markUserVerified(email:string):Promise<void>;
    selectRole(id:string|undefined,role:string):Promise<UserDto>;
    createFreelancerProfile(id:string|undefined,freelancerData:Partial<IUser>):Promise<IUser>;
    createClientProfile(id: string, clientData: ClientProfileDto): Promise<ClientProfileUpdateResponseDto>
    switchRole(id:string):Promise<UserDto>
    me(id:string):Promise<UserDto>
}