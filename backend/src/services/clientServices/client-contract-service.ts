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
import {
  ApproveMilestoneDeliverableDTO,
  RequestMilestoneChangesDTO,
  RespondToExtensionDTO,
  MilestoneDeliverableResponseDTO,
  MilestoneExtensionResponseDTO,
  ClientMilestonesDetailDTO,
} from '../../dto/clientDTO/client-milestone.dto';
import { mapContractModelToClientContractDetailDTO } from '../../mapper/clientMapper/client-contract.mapper';
import { mapContractModelToClientContractListItemDTO } from '../../mapper/clientMapper/client-contract-list.mapper';
import { ClientDeliverableMapper } from '../../mapper/clientMapper/client-deliverable.mapper';
import { ClientMilestoneMapper } from '../../mapper/clientMapper/client-milestone.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { Types } from 'mongoose';
import {
  IEscrowRepository,
  ITransactionRepository,
} from '../../repositories/interfaces/payment-repository.interface';
import { IUserRepository } from '../../repositories/interfaces/user-repository.interface';
import { ERROR_MESSAGES } from '../../contants/error-constants';

@injectable()
export class ClientContractService implements IClientContractService {
  private _contractRepository: IContractRepository;
  private _escrowRepository: IEscrowRepository;
  private _transactionRepository: ITransactionRepository;
  private _userRepository: IUserRepository;

  constructor(
    @inject('IContractRepository') contractRepository: IContractRepository,
    @inject('IEscrowRepository') escrowRepository: IEscrowRepository,
    @inject('ITransactionRepository') transactionRepository: ITransactionRepository,
    @inject('IUserRepository') userRepository: IUserRepository,
  ) {
    this._contractRepository = contractRepository;
    this._escrowRepository = escrowRepository;
    this._transactionRepository = transactionRepository;
    this._userRepository = userRepository;
  }

  async getContractDetail(clientId: string, contractId: string): Promise<ClientContractDetailDTO> {
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

    const existing = await this._contractRepository.findContractDetailByIdForClient(
      contractId,
      clientId,
    );
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
      throw new AppError(
        'You are not authorized to approve deliverables for this contract',
        HttpStatus.FORBIDDEN,
      );
    }

    if (contract.status !== 'active') {
      throw new AppError('Contract must be active to approve deliverables', HttpStatus.BAD_REQUEST);
    }

    const deliverable = contract.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!deliverable) {
      throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    }

    if (deliverable.status === 'approved') {
      throw new AppError('Deliverable already approved', HttpStatus.BAD_REQUEST);
    }

    // Find escrow for this contract
    const escrow = await this._escrowRepository.findOneByContractIdAndStatus(
      contractId,
      'held',
    );

    if (!escrow) {
      throw new AppError('No held escrow found for this contract', HttpStatus.BAD_REQUEST);
    }

    // Release escrow
    const releasedEscrow = await this._escrowRepository.releaseEscrow(escrow.escrowId);
    if (!releasedEscrow) {
      throw new AppError('Failed to release escrow', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Credit freelancer wallet
    const freelancer = await this._userRepository.updateWalletBalance(
      contract.freelancerId.toString(),
      escrow.amount,
    );
    if (!freelancer) {
      throw new AppError('Freelancer not found', HttpStatus.NOT_FOUND);
    }

    await this._transactionRepository.createTransaction({
      contractId: new Types.ObjectId(contractId),
      paymentId: escrow.paymentId,
      fromUserId: contract.clientId,
      toUserId: contract.freelancerId,
      type: 'credit',
      purpose: 'contract_funding',
      amount: escrow.amount,
      description: `Payment for approved deliverable - ${contract.title}`,
      metadata: {
        deliverableId: data.deliverableId,
        escrowId: escrow.escrowId,
        approvalMessage: data.message,
      },
    });

    // Update contract with deliverable approval
    const updatedContract = await this._contractRepository.approveDeliverable(
      contractId,
      data.deliverableId,
      data.message,
    );

    if (!updatedContract) {
      throw new AppError('Failed to approve deliverable', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Update contract balance and totalPaid
    const newTotalPaid = (updatedContract.totalPaid || 0) + escrow.amount;
    const newBalance = (updatedContract.fundedAmount || 0) - newTotalPaid;
    const finalContract = await this._contractRepository.updateContractPayment(
      contractId,
      newTotalPaid,
      newBalance,
    );

    if (!finalContract) {
      throw new AppError('Failed to update contract payment info', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (contract.paymentType === 'fixed' || contract.paymentType === 'fixed_with_milestones') {
      const remainingEscrow = await this._escrowRepository.findOneByContractIdAndStatus(
        contractId,
        'held',
      );

      if (!remainingEscrow) {
        await this._contractRepository.markContractAsCompleted(contractId);
      }
    }

    const approvedDeliverable = finalContract.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!approvedDeliverable) {
      throw new AppError(
        'Failed to retrieve approved deliverable',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return ClientDeliverableMapper.toDeliverableResponseDTO(approvedDeliverable, finalContract);
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
      throw new AppError(
        'You are not authorized to request changes for this contract',
        HttpStatus.FORBIDDEN,
      );
    }

    if (contract.status !== 'active') {
      throw new AppError('Contract must be active to request changes', HttpStatus.BAD_REQUEST);
    }

    const deliverable = contract.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!deliverable) {
      throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    }

    if (deliverable.status === 'approved') {
      throw new AppError(
        'Cannot request changes for an approved deliverable',
        HttpStatus.BAD_REQUEST,
      );
    }

    // enforce revision limits
    const currentRequested = deliverable.revisionsRequested || 0;
    let allowedRevisions = 0;
    if (contract.paymentType === 'fixed_with_milestones' && contract.milestones) {
      const idx = Math.max(0, (deliverable.version || 1) - 1);
      const milestone = contract.milestones[idx];
      if (milestone && typeof (milestone as any).revisionsAllowed === 'number') {
        allowedRevisions = (milestone as any).revisionsAllowed;
      }
    }
    if (!allowedRevisions && typeof (contract as any).revisions === 'number') {
      allowedRevisions = (contract as any).revisions || 0;
    }

    if (currentRequested >= (allowedRevisions || 0)) {
      throw new AppError('Revision limit reached for this deliverable', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.requestDeliverableChanges(
      contractId,
      data.deliverableId,
      data.message,
    );

    if (!updatedContract) {
      throw new AppError('Failed to request changes', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const changedDeliverable = updatedContract.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!changedDeliverable) {
      throw new AppError(
        'Failed to retrieve updated deliverable',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return ClientDeliverableMapper.toDeliverableResponseDTO(changedDeliverable, updatedContract);
  }

  async approveMilestoneDeliverable(
    clientId: string,
    contractId: string,
    data: ApproveMilestoneDeliverableDTO,
  ): Promise<MilestoneDeliverableResponseDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.milestoneId)) {
      throw new AppError('Invalid milestoneId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.deliverableId)) {
      throw new AppError('Invalid deliverableId', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError(
        'You are not authorized to approve deliverables for this contract',
        HttpStatus.FORBIDDEN,
      );
    }

    if (contract.status !== 'active') {
      throw new AppError('Contract must be active to approve deliverables', HttpStatus.BAD_REQUEST);
    }

    const milestone = contract.milestones?.find((m) => m._id?.toString() === data.milestoneId);

    if (!milestone) {
      throw new AppError('Milestone not found', HttpStatus.NOT_FOUND);
    }

    const deliverable = milestone.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!deliverable) {
      throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    }

    if (deliverable.status === 'approved') {
      throw new AppError('Deliverable already approved', HttpStatus.BAD_REQUEST);
    }


    console.log(data.milestoneId);

    const escrow = await this._escrowRepository.findByContractAndMilestone(
      contractId,
      data.milestoneId,
    );

    console.log(escrow);

    if (!escrow || escrow.status !== 'held') {
      throw new AppError('No held escrow found for this milestone', HttpStatus.BAD_REQUEST);
    }

    const releasedEscrow = await this._escrowRepository.releaseEscrow(escrow.escrowId);
    if (!releasedEscrow) {
      throw new AppError('Failed to release escrow', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const freelancer = await this._userRepository.updateWalletBalance(
      contract.freelancerId.toString(),
      escrow.amount,
    );
    if (!freelancer) {
      throw new AppError('Freelancer not found', HttpStatus.NOT_FOUND);
    }

    await this._transactionRepository.createTransaction({
      contractId: new Types.ObjectId(contractId),
      paymentId: escrow.paymentId,
      fromUserId: contract.clientId,
      toUserId: contract.freelancerId,
      type: 'credit',
      purpose: 'milestone_funding',
      amount: escrow.amount,
      description: `Payment for approved milestone - ${milestone.title}`,
      metadata: {
        milestoneId: data.milestoneId,
        deliverableId: data.deliverableId,
        escrowId: escrow.escrowId,
        approvalMessage: data.message,
      },
    });

    const updatedContract = await this._contractRepository.approveMilestoneDeliverable(
      contractId,
      data.milestoneId,
      data.deliverableId,
      data.message,
    );

    if (!updatedContract) {
      throw new AppError('Failed to approve deliverable', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const newTotalPaid = (updatedContract.totalPaid || 0) + escrow.amount;
    const newBalance = (updatedContract.fundedAmount || 0) - newTotalPaid;
    const finalContract = await this._contractRepository.updateContractPayment(
      contractId,
      newTotalPaid,
      newBalance,
    );

    if (!finalContract) {
      throw new AppError('Failed to update contract payment info', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this._contractRepository.updateMilestoneStatus(
      contractId,
      data.milestoneId,
      'paid',
    );

    await this._contractRepository.addTimelineEntry(
      contractId,
      'milestone_deliverable_approved',
      clientId,
      data.milestoneId,
      `Milestone approved: ${milestone.title}`,
    );

    if (contract.paymentType === 'fixed_with_milestones') {
      const remainingEscrow = await this._escrowRepository.findOneByContractIdAndStatus(
        contractId,
        'held',
      );

      if (!remainingEscrow) {
        await this._contractRepository.markContractAsCompleted(contractId);
      }
    }

    const updatedMilestone = finalContract.milestones?.find(
      (m) => m._id?.toString() === data.milestoneId,
    );
    const approvedDeliverable = updatedMilestone?.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!approvedDeliverable || !updatedMilestone) {
      throw new AppError(
        'Failed to retrieve approved deliverable',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return ClientMilestoneMapper.toMilestoneDeliverableResponseDTO(
      approvedDeliverable,
      updatedMilestone,
    );
  }

  async requestMilestoneChanges(
    clientId: string,
    contractId: string,
    data: RequestMilestoneChangesDTO,
  ): Promise<MilestoneDeliverableResponseDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.milestoneId)) {
      throw new AppError('Invalid milestoneId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.deliverableId)) {
      throw new AppError('Invalid deliverableId', HttpStatus.BAD_REQUEST);
    }

    if (!data.message || data.message.trim().length === 0) {
      throw new AppError('Change request message is required', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError(
        'You are not authorized to request changes for this contract',
        HttpStatus.FORBIDDEN,
      );
    }

    if (contract.status !== 'active') {
      throw new AppError(
        'Contract must be active to request changes',
        HttpStatus.BAD_REQUEST,
      );
    }

    const milestone = contract.milestones?.find((m) => m._id?.toString() === data.milestoneId);

    if (!milestone) {
      throw new AppError('Milestone not found', HttpStatus.NOT_FOUND);
    }

    const deliverable = milestone.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!deliverable) {
      throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    }

    const currentRequested = deliverable.revisionsRequested || 0;
    const allowedRevisions = milestone.revisionsAllowed || 0;

    if (currentRequested >= allowedRevisions) {
      throw new AppError('Revision limit reached for this milestone', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.requestMilestoneChanges(
      contractId,
      data.milestoneId,
      data.deliverableId,
      data.message,
    );

    if (!updatedContract) {
      throw new AppError('Failed to request changes', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this._contractRepository.addTimelineEntry(
      contractId,
      'milestone_changes_requested',
      clientId,
      data.milestoneId,
      `Changes requested for milestone: ${milestone.title}`,
    );

    const updatedMilestone = updatedContract.milestones?.find(
      (m) => m._id?.toString() === data.milestoneId,
    );
    const changedDeliverable = updatedMilestone?.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!changedDeliverable || !updatedMilestone) {
      throw new AppError(
        'Failed to retrieve updated deliverable',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return ClientMilestoneMapper.toMilestoneDeliverableResponseDTO(
      changedDeliverable,
      updatedMilestone,
    );
  }

  async respondToMilestoneExtension(
    clientId: string,
    contractId: string,
    data: RespondToExtensionDTO,
  ): Promise<MilestoneExtensionResponseDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.milestoneId)) {
      throw new AppError('Invalid milestoneId', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError(
        'You are not authorized to respond to extension requests for this contract',
        HttpStatus.FORBIDDEN,
      );
    }

    const milestone = contract.milestones?.find((m) => m._id?.toString() === data.milestoneId);

    if (!milestone) {
      throw new AppError('Milestone not found', HttpStatus.NOT_FOUND);
    }

    if (!milestone.extensionRequest || milestone.extensionRequest.status !== 'pending') {
      throw new AppError('No pending extension request found', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.respondToMilestoneExtension(
      contractId,
      data.milestoneId,
      data.approved,
      data.responseMessage,
    );

    if (!updatedContract) {
      throw new AppError('Failed to respond to extension request', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const action = data.approved ? 'milestone_extension_approved' : 'milestone_extension_rejected';
    await this._contractRepository.addTimelineEntry(
      contractId,
      action,
      clientId,
      data.milestoneId,
      `Extension ${data.approved ? 'approved' : 'rejected'} for milestone: ${milestone.title}`,
    );

    const updatedMilestone = updatedContract.milestones?.find(
      (m) => m._id?.toString() === data.milestoneId,
    );

    if (!updatedMilestone?.extensionRequest) {
      throw new AppError(
        'Failed to retrieve extension response',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return ClientMilestoneMapper.toMilestoneExtensionResponseDTO(
      updatedMilestone.extensionRequest,
    );
  }


  async getMilestoneDetail(
    clientId: string,
    contractId: string,
    milestoneId: string,
  ): Promise<ClientMilestonesDetailDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }
    if (!Types.ObjectId.isValid(milestoneId)) {
      throw new AppError('Invalid milestoneId', HttpStatus.BAD_REQUEST);
    } 

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError(ERROR_MESSAGES.CONTRACT.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError(
        ERROR_MESSAGES.CONTRACT.UNAUTHORIZED_ACCESS,
        HttpStatus.FORBIDDEN,
      );
    }
    const milestone = contract.milestones?.find((m) => m._id?.toString() === milestoneId);

    if (!milestone) {
      throw new AppError('Milestone not found', HttpStatus.NOT_FOUND);
    }

    return ClientMilestoneMapper.toClientMilestoneDetailDTO(milestone);
  }
}
