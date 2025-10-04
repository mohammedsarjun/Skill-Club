import { GetClientDTO, UpdateClientDto } from "../../../dto/clientDTO/client.dto.js";
export interface IClientService {
    getClientData(id: string): Promise<GetClientDTO>;
    updateClient(id: string, data: Partial<UpdateClientDto>): Promise<GetClientDTO>;
}
//# sourceMappingURL=IClientServices.d.ts.map