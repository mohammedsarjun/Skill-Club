import { GetClientDTO, UpdateClientDto } from "../../dto/clientDTO/client.dto.js";
import { IClientProfile } from "../../models/interfaces/IUserModel.js";
export declare const mapClientToDTO: (clientData: IClientProfile) => GetClientDTO;
export declare const mapUpdateClientDtoToClientModel: (clientData: GetClientDTO) => UpdateClientDto;
//# sourceMappingURL=client.mapper.d.ts.map