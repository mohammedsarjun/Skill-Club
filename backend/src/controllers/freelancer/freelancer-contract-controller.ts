import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IFreelancerContractController } from './interfaces/freelancer-contract-controller.interface';
import { IFreelancerContractService } from '../../services/freelancerServices/interfaces/freelancer-contract-service.interface';
import { HttpStatus } from '../../enums/http-status.enum';
import { FreelancerContractQueryParamsDTO } from '../../dto/freelancerDTO/freelancer-contract.dto';

@injectable()
export class FreelancerContractController implements IFreelancerContractController {
  private _freelancerContractService: IFreelancerContractService;

  constructor(@inject('IFreelancerContractService') freelancerContractService: IFreelancerContractService) {
    this._freelancerContractService = freelancerContractService;
  }

  async getContracts(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { search, page, limit, status } = req.query;

    const query: FreelancerContractQueryParamsDTO = {
      search: search as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      filters: {
        status: status as FreelancerContractQueryParamsDTO['filters']['status'],
      },
    };

    const result = await this._freelancerContractService.getAllContracts(freelancerId, query);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Contracts fetched successfully',
      data: result,
    });
  }
}
