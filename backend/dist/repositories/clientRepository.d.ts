import { IUser } from "../models/interfaces/IUserModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IClientRepository } from "./interfaces/IClientRepository.js";
import { UpdateClientDto } from "../dto/clientDTO/client.dto.js";
export declare class ClientRepository extends BaseRepository<IUser> implements IClientRepository {
    constructor();
    getClientById(userId: string): Promise<IUser | null>;
    updateClientById(userId: string, data: UpdateClientDto): Promise<IUser | null>;
}
//# sourceMappingURL=clientRepository.d.ts.map