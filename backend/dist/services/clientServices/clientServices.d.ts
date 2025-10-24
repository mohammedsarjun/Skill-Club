import '../../config/container.js';
import { IClientService } from './interfaces/IClientServices.js';
import type { IClientRepository } from '../../repositories/interfaces/IClientRepository.js';
import { GetClientDTO, UpdateClientDto } from '../../dto/clientDTO/client.dto.js';
export declare class ClientService implements IClientService {
  private _clientRepository;
  constructor(clientRepository: IClientRepository);
  getClientData(id: string): Promise<GetClientDTO>;
  updateClient(id: string, data: Partial<UpdateClientDto>): Promise<GetClientDTO>;
}
//# sourceMappingURL=clientServices.d.ts.map
