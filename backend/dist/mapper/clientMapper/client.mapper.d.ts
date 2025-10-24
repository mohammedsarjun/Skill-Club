import { GetClientDTO, UpdateClientDto } from '../../dto/clientDTO/client.dto';
import { IClientProfile } from '../../models/interfaces/i-user.model';
export declare const mapClientToDTO: (clientData: IClientProfile) => GetClientDTO;
export declare const mapUpdateClientDtoToClientModel: (clientData: GetClientDTO) => UpdateClientDto;
//# sourceMappingURL=client.mapper.d.ts.map