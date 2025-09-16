import { User} from "../models/userModel.js";
import {IUser} from "../models/interfaces/IUserModel.js"
import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IUserRepository } from "./interfaces/IUserRepository.js";
export class UserRepository extends BaseRepository<IUser> implements IUserRepository{


  constructor() {
    super(User); 
  }

  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
          return await this.model.findOne({ email });
  }


}
