import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IFreelancerContractService } from './interfaces/freelancer-contract-service.interface';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';
import {
  FreelancerContractListResultDTO,
  FreelancerContractQueryParamsDTO,
  FreelancerContractDetailDTO,
} from '../../dto/freelancerDTO/freelancer-contract.dto';
import { DeliverableResponseDTO, SubmitDeliverableDTO } from '../../dto/freelancerDTO/freelancer-deliverable.dto';
import { mapContractModelToFreelancerContractListItemDTO } from '../../mapper/freelancerMapper/freelancer-contract-list.mapper';
import { mapContractToFreelancerDetailDTO } from '../../mapper/freelancerMapper/freelancer-contract.mapper';
import { FreelancerDeliverableMapper } from '../../mapper/freelancerMapper/freelancer-deliverable.mapper';
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

  async getContractDetail(freelancerId: string, contractId: string): Promise<FreelancerContractDetailDTO> {
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new AppError('Invalid freelancerId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findDetailByIdForFreelancer(contractId, freelancerId);

    if (!contract) {
      throw new AppError('Contract not found or you are not authorized to view it', HttpStatus.NOT_FOUND);
    }

    return mapContractToFreelancerDetailDTO(contract);
  }

  async submitDeliverable(
    freelancerId: string,
    contractId: string,
    data: SubmitDeliverableDTO,
  ): Promise<DeliverableResponseDTO> {
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new AppError('Invalid freelancerId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    console.log(data)

    if (!data.files || data.files.length === 0) {
      throw new AppError('At least one file is required', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.freelancerId.toString() !== freelancerId) {
      throw new AppError('You are not authorized to submit deliverables for this contract', HttpStatus.FORBIDDEN);
    }

    if (contract.status !== 'active') {
      throw new AppError('Contract must be active to submit deliverables', HttpStatus.BAD_REQUEST);
    }

    if (contract.paymentType !== 'fixed') {
      throw new AppError('Only fixed-price contracts support deliverables', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.submitDeliverable(
      contractId,
      freelancerId,
      data.files,
      data.message,
    );

    if (!updatedContract || !updatedContract.deliverables || updatedContract.deliverables.length === 0) {
      throw new AppError('Failed to submit deliverable', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const latestDeliverable = updatedContract.deliverables[updatedContract.deliverables.length - 1];

    return FreelancerDeliverableMapper.toDeliverableResponseDTO(latestDeliverable);
  }
}
