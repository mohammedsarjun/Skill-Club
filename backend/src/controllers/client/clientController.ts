import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';

import { IClientController } from './interfaces/IClientController.js';
import type { IClientService } from '../../services/clientServices/interfaces/IClientServices.js';
import { GetClientDTO, UpdateClientDto } from '../../dto/clientDTO/client.dto.js';
import { mapUpdateClientDtoToClientModel } from '../../mapper/clientMapper/client.mapper.js';

@injectable()
export class ClientController implements IClientController {
  private _clientService: IClientService;
  constructor(@inject('IClientService') clientService: IClientService) {
    this._clientService = clientService;
  }

  async getClientData(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const result: GetClientDTO = await this._clientService.getClientData(userId!);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Client Data Fetched Successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const dto=mapUpdateClientDtoToClientModel(req.body)
      const result: GetClientDTO = await this._clientService.updateClient(userId!,dto);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Client Data Updated Successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
