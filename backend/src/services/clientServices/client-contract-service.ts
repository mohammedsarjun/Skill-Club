import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientContractService } from './interfaces/client-contract-service.interface';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';
import {
  ClientContractDetailDTO,
  ClientContractListResultDTO,
  ClientContractQueryParamsDTO,
} from '../../dto/clientDTO/client-contract.dto';
import {
  DeliverableResponseDTO,
  ApproveDeliverableDTO,
  RequestChangesDTO,
} from '../../dto/clientDTO/client-deliverable.dto';
import { mapContractModelToClientContractDetailDTO } from '../../mapper/clientMapper/client-contract.mapper';
import { mapContractModelToClientContractListItemDTO } from '../../mapper/clientMapper/client-contract-list.mapper';
import { ClientDeliverableMapper } from '../../mapper/clientMapper/client-deliverable.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { Types } from 'mongoose';

@injectable()
export class ClientContractService implements IClientContractService {
  private _contractRepository: IContractRepository;

  constructor(@inject('IContractRepository') contractRepository: IContractRepository) {
    this._contractRepository = contractRepository;
  }

  async getContractDetail(
    clientId: string,
    contractId: string,
  ): Promise<ClientContractDetailDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findContractDetailByIdForClient(
      contractId,
      clientId,
    );

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    return mapContractModelToClientContractDetailDTO(contract);
  }

  async cancelContract(clientId: string, contractId: string): Promise<{ cancelled: boolean }> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    const existing = await this._contractRepository.findContractDetailByIdForClient(contractId, clientId);
    if (!existing) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (existing.status === 'cancelled') {
      throw new AppError('Contract already cancelled', HttpStatus.BAD_REQUEST);
    }

    await this._contractRepository.updateStatusById(contractId, 'cancelled');

    return { cancelled: true };
  }

  async getAllContracts(
    clientId: string,
    query: ClientContractQueryParamsDTO,
  ): Promise<ClientContractListResultDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    const normalizedQuery: ClientContractQueryParamsDTO = {
      search: query.search,
      page: query.page && query.page > 0 ? query.page : 1,
      limit: query.limit && query.limit > 0 ? query.limit : 10,
      filters: query.filters || {},
    };

    const [contracts, total] = await Promise.all([
      this._contractRepository.findAllForClient(clientId, normalizedQuery),
      this._contractRepository.countForClient(clientId, normalizedQuery),
    ]);

    const items = contracts.map(mapContractModelToClientContractListItemDTO);

    return {
      items,
      page: normalizedQuery.page!,
      limit: normalizedQuery.limit!,
      total,
      pages: Math.ceil(total / normalizedQuery.limit!),
    };
  }

  async approveDeliverable(
    clientId: string,
    contractId: string,
    data: ApproveDeliverableDTO,
  ): Promise<DeliverableResponseDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.deliverableId)) {
      throw new AppError('Invalid deliverableId', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('You are not authorized to approve deliverables for this contract', HttpStatus.FORBIDDEN);
    }

    if (contract.status !== 'active') {
      throw new AppError('Contract must be active to approve deliverables', HttpStatus.BAD_REQUEST);
    }

    const deliverable = contract.deliverables?.find(d => d._id?.toString() === data.deliverableId);

    if (!deliverable) {
      throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    }

    if (deliverable.status === 'approved') {
      throw new AppError('Deliverable already approved', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.approveDeliverable(contractId, data.deliverableId);

    if (!updatedContract) {
      throw new AppError('Failed to approve deliverable', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const approvedDeliverable = updatedContract.deliverables?.find(d => d._id?.toString() === data.deliverableId);

    if (!approvedDeliverable) {
      throw new AppError('Failed to retrieve approved deliverable', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return ClientDeliverableMapper.toDeliverableResponseDTO(approvedDeliverable);
  }

  async requestDeliverableChanges(
    clientId: string,
    contractId: string,
    data: RequestChangesDTO,
  ): Promise<DeliverableResponseDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.deliverableId)) {
      throw new AppError('Invalid deliverableId', HttpStatus.BAD_REQUEST);
    }

    if (!data.message || data.message.trim().length === 0) {
      throw new AppError('Message is required when requesting changes', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('You are not authorized to request changes for this contract', HttpStatus.FORBIDDEN);
    }

    if (contract.status !== 'active') {
      throw new AppError('Contract must be active to request changes', HttpStatus.BAD_REQUEST);
    }

    const deliverable = contract.deliverables?.find(d => d._id?.toString() === data.deliverableId);

    if (!deliverable) {
      throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    }

    if (deliverable.status === 'approved') {
      throw new AppError('Cannot request changes for an approved deliverable', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.requestDeliverableChanges(
      contractId,
      data.deliverableId,
      data.message,
    );

    if (!updatedContract) {
      throw new AppError('Failed to request changes', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const changedDeliverable = updatedContract.deliverables?.find(d => d._id?.toString() === data.deliverableId);

    if (!changedDeliverable) {
      throw new AppError('Failed to retrieve updated deliverable', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return ClientDeliverableMapper.toDeliverableResponseDTO(changedDeliverable);
  }
}
