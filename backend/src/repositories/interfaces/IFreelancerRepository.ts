import BaseRepository from "../baseRepositories/baseRepository.js";
import { IUser } from "../../models/interfaces/IUserModel.js";
export interface IFreelancerRepository extends BaseRepository<IUser>{
    getFreelancerById(userId: string):Promise<IUser|null>
}