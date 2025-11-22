import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IFreelancerContractService } from './interfaces/freelancer-contract-service.interface';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';
import {
  FreelancerContractListResultDTO,
  FreelancerContractQueryParamsDTO,
} from '../../dto/freelancerDTO/freelancer-contract.dto';
import { mapContractModelToFreelancerContractListItemDTO } from '../../mapper/freelancerMapper/freelancer-contract-list.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { Types } from 'mongoose';

@injectable()
export class FreelancerContractService implements IFreelancerContractService {
  private _contractRepository: IContractRepository;

  constructor(@inject('IContractRepository') contractRepository: IContractRepository) {
    this._contractRepository = contractRepository;
  }

  async getAllContracts(
    freelancerId: string,
    query: FreelancerContractQueryParamsDTO,
  ): Promise<FreelancerContractListResultDTO> {
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new AppError('Invalid freelancerId', HttpStatus.BAD_REQUEST);
    }

    const normalizedQuery: FreelancerContractQueryParamsDTO = {
      search: query.search,
      page: query.page && query.page > 0 ? query.page : 1,
      limit: query.limit && query.limit > 0 ? query.limit : 10,
      filters: query.filters || {},
    };

    const [contracts, total] = await Promise.all([
      this._contractRepository.findAllForFreelancer(freelancerId, normalizedQuery),
      this._contractRepository.countForFreelancer(freelancerId, normalizedQuery),
    ]);

    const items = contracts.map(mapContractModelToFreelancerContractListItemDTO);

    return {
      items,
      page: normalizedQuery.page!,
      limit: normalizedQuery.limit!,
      total,
      pages: Math.ceil(total / normalizedQuery.limit!),
    };
  }
}
