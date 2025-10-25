import { User } from '../../models/user.model';
import { IUser } from '../../models/interfaces/i-user.model';
import BaseRepository from '../baseRepositories/base-repository';

import { IClientRepository } from './interfaces/i-client-repository';
import { UpdateClientDto } from '../../dto/clientDTO/client.dto';

export class ClientRepository extends BaseRepository<IUser> implements IClientRepository {
  constructor() {
    super(User);
  }

  async getClientById(userId: string) {
    return super.findOne({ _id: userId, roles: 'client' });
  }

  async updateClientById(userId: string, data: UpdateClientDto): Promise<IUser | null> {
    return await this.model.findByIdAndUpdate(userId, { $set: data }, { new: true });
  }
}
