import { User } from "../models/userModel.js";
import { IUser } from "../models/interfaces/IUserModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IFreelancerRepository } from "./interfaces/IFreelancerRepository.js";


export class FreelancerRepository extends BaseRepository<IUser> implements IFreelancerRepository{
  constructor() {
    super(User); 
  }

  async getFreelancerById(userId: string) {
    console.log(userId)
    return this.findOne({ _id: userId, roles: "freelancer" });
  }

}