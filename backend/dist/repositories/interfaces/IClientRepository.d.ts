import BaseRepository from '../baseRepositories/baseRepository.js';
import { IUser } from '../../models/interfaces/IUserModel.js';
import { UpdateClientDto } from '../../dto/clientDTO/client.dto.js';
export interface IClientRepository extends BaseRepository<IUser> {
  getClientById(userId: string): Promise<IUser | null>;
  updateClientById(userId: string, data: Partial<UpdateClientDto>): Promise<IUser | null>;
}
//# sourceMappingURL=IClientRepository.d.ts.map
