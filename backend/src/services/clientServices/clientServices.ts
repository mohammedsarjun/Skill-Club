import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IClientService } from './interfaces/IClientServices.js';
import type { IClientRepository } from '../../repositories/interfaces/IClientRepository.js';
import { mapClientToDTO } from '../../mapper/clientMapper/client.mapper.js';
import { GetClientDTO, UpdateClientDto } from '../../dto/clientDTO/client.dto.js';
import { flattenObject } from '../../utils/flattenObjects.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
@injectable()
export class ClientService implements IClientService {
  private _clientRepository: IClientRepository;
  constructor(@inject('IClientRepository') clientRepository: IClientRepository) {
    this._clientRepository = clientRepository;
  }

  async getClientData(id: string): Promise<GetClientDTO> {
    try {
      const clientData = await this._clientRepository.getClientById(id);

      if (!clientData || !clientData.clientProfile) {
        // More explicit error if the profile itself is missing
        throw new AppError("Client or Client profile doesn't exist", HttpStatus.NOT_FOUND);
      }

      // Map the profile to DTO safely
      const clientDto = mapClientToDTO(clientData.clientProfile);

      return clientDto;
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.CLIENT.FETCH_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 async updateClient(
  id: string,
  data: Partial<UpdateClientDto>
): Promise<GetClientDTO> {

  const clientData = await this._clientRepository.getClientById(id);


  if (!clientData || !clientData.clientProfile) {
    throw new AppError(
      ERROR_MESSAGES.CLIENT.NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  }

  const flattedData=flattenObject(data)

  console.log(flattedData)

  const updatedClient = await this._clientRepository.updateClientById(id, flattedData);


  if (!updatedClient?.clientProfile) {
    throw new AppError(
      "Updated client profile not found",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }


  const clientDto = mapClientToDTO(updatedClient.clientProfile);

  return clientDto;
}

}
