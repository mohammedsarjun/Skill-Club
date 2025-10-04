import { User } from "../models/userModel.js";
import { IUser } from "../models/interfaces/IUserModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";

import { IClientRepository } from "./interfaces/IClientRepository.js";
import { UpdateClientDto } from "../dto/clientDTO/client.dto.js";


export class ClientRepository extends BaseRepository<IUser> implements IClientRepository{
  constructor() {
    super(User); 
  }

  async getClientById(userId: string) {

    return super.findOne({ _id: userId, roles: "client" });
  }

  async updateClientById(userId: string, data: UpdateClientDto): Promise<IUser | null> {
      return super.update(userId,data)
  }
}