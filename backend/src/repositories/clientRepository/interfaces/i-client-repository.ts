import BaseRepository from '../../baseRepositories/base-repository';
import { IUser } from '../../../models/interfaces/i-user.model';
import { UpdateClientDto } from '../../../dto/clientDTO/client.dto';
export interface IClientRepository extends BaseRepository<IUser> {
  getClientById(userId: string): Promise<IUser | null>;
  updateClientById(userId: string, data: Partial<UpdateClientDto>): Promise<IUser | null>;
}
