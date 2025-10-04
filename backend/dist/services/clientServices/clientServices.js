var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { mapClientToDTO } from '../../mapper/clientMapper/client.mapper.js';
let ClientService = class ClientService {
    constructor(clientRepository) {
        this._clientRepository = clientRepository;
    }
    async getClientData(id) {
        try {
            const clientData = await this._clientRepository.getClientById(id);
            if (!clientData || !clientData.clientProfile) {
                // More explicit error if the profile itself is missing
                throw new AppError("Client or Client profile doesn't exist", HttpStatus.NOT_FOUND);
            }
            // Map the profile to DTO safely
            const clientDto = mapClientToDTO(clientData.clientProfile);
            return clientDto;
        }
        catch (error) {
            console.error(`Error fetching Client data for ID: ${id}`, error);
            throw new AppError('Failed to fetch Client data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateClient(id, data) {
        const clientData = await this._clientRepository.getClientById(id);
        if (!clientData || !clientData.clientProfile) {
            throw new AppError("Client or Client profile doesn't exist", HttpStatus.NOT_FOUND);
        }
        console.log(data);
        const updatedClient = await this._clientRepository.updateClientById(id, data);
        if (!updatedClient?.clientProfile) {
            throw new AppError("Updated client profile not found", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const clientDto = mapClientToDTO(updatedClient.clientProfile);
        return clientDto;
    }
};
ClientService = __decorate([
    injectable(),
    __param(0, inject('IClientRepository')),
    __metadata("design:paramtypes", [Object])
], ClientService);
export { ClientService };
//# sourceMappingURL=clientServices.js.map