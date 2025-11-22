import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientContractController } from './interfaces/client-contract-controller.interface';
import { IClientContractService } from '../../services/clientServices/interfaces/client-contract-service.interface';
import { HttpStatus } from '../../enums/http-status.enum';
import { ClientContractQueryParamsDTO } from '../../dto/clientDTO/client-contract.dto';

@injectable()
export class ClientContractController implements IClientContractController {
  private _clientContractService: IClientContractService;

  constructor(@inject('IClientContractService') clientContractService: IClientContractService) {
    this._clientContractService = clientContractService;
  }

  async getContracts(req: Request, res: Response): Promise<void> {
    const clientId = req.user?.userId as string;
    const { search, page, limit, status } = req.query;

    const query: ClientContractQueryParamsDTO = {
      search: search as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      filters: {
        status: status as ClientContractQueryParamsDTO['filters']['status'],
      },
    };

    const result = await this._clientContractService.getAllContracts(clientId, query);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Contracts fetched successfully',
      data: result,
    });
  }

  async getContractDetail(req: Request, res: Response): Promise<void> {
    const clientId = req.user?.userId as string;
    const { contractId } = req.params;

    const result = await this._clientContractService.getContractDetail(clientId, contractId);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Contract detail fetched successfully',
      data: result,
    });
  }

  async cancelContract(req: Request, res: Response): Promise<void> {
    const clientId = req.user?.userId as string;
    const { contractId } = req.params;

    const result = await this._clientContractService.cancelContract(clientId, contractId);

    res.status(HttpStatus.OK).json({ success: true, message: 'Contract cancelled', data: result });
  }
}
