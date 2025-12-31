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
import {
  RespondToContractExtensionDTO,
  ContractExtensionResponseDTO,
} from '../../dto/clientDTO/client-contract-extension.dto';
import { mapContractModelToClientContractDetailDTO } from '../../mapper/clientMapper/client-contract.mapper';
import { mapContractModelToClientContractListItemDTO } from '../../mapper/clientMapper/client-contract-list.mapper';
import { ClientDeliverableMapper } from '../../mapper/clientMapper/client-deliverable.mapper';
import { ClientMilestoneMapper } from '../../mapper/clientMapper/client-milestone.mapper';
import { ClientContractExtensionMapper } from '../../mapper/clientMapper/client-contract-extension.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { Types } from 'mongoose';
import {
  IEscrowRepository,
  ITransactionRepository,
} from '../../repositories/interfaces/payment-repository.interface';
import { IMeetingRepository } from '../../repositories/interfaces/meeting-repository.interface';
import { IUserRepository } from '../../repositories/interfaces/user-repository.interface';
import { ERROR_MESSAGES } from '../../contants/error-constants';
import { IContract, ContractDeliverable } from '../../models/interfaces/contract.model.interface';
import { IFileDownloadService } from '../commonServices/interfaces/file-download-service.interface';
import { DownloadDeliverableDTO } from '../../dto/clientDTO/client-deliverable.dto';
import { FileDownloadInput } from '../../dto/files-download.dto';
import archiver from 'archiver';
import { DeliverableChangeStrategyFactory } from './factories/deliverableFactories/DeliverableChangeStrategyFactory';

@injectable()
export class ClientContractService implements IClientContractService {
  private _contractRepository: IContractRepository;
  private _escrowRepository: IEscrowRepository;
  private _transactionRepository: ITransactionRepository;
  private _userRepository: IUserRepository;
  private _meetingRepository: IMeetingRepository;
  private _fileDownloadService: IFileDownloadService;
  private _deliverableChangeStrategyFactory: DeliverableChangeStrategyFactory;

  constructor(
    @inject('IContractRepository') contractRepository: IContractRepository,
    @inject('IEscrowRepository') escrowRepository: IEscrowRepository,
    @inject('ITransactionRepository') transactionRepository: ITransactionRepository,
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('IMeetingRepository') meetingRepository: IMeetingRepository,
    @inject('IFileDownloadService') fileDownloadService: IFileDownloadService,
    @inject('DeliverableChangeStrategyFactory') deliverableChangeStrategyFactory: DeliverableChangeStrategyFactory,
  ) {
    this._contractRepository = contractRepository;
    this._escrowRepository = escrowRepository;
    this._transactionRepository = transactionRepository;
    this._userRepository = userRepository;
    this._meetingRepository = meetingRepository;
    this._fileDownloadService = fileDownloadService;
    this._deliverableChangeStrategyFactory = deliverableChangeStrategyFactory;
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

    const dto = mapContractModelToClientContractDetailDTO(contract);

    if (dto.deliverables && dto.deliverables.length > 0) {
      const checks = await Promise.all(
        dto.deliverables.map((d) =>
          this._meetingRepository.isMeetingAlreadyProposed(
            contract._id?.toString() || '',
            'fixed',
            undefined,
            d.deliverableId,
          ),
        ),
      );

      console.log(checks)

      

      dto.deliverables = dto.deliverables.map((d, i) => ({ ...d, isMeetingProposalSent: !!checks[i] }));
    }

    console.log(dto.deliverables)

    return dto;
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

  private async approveDeliverableInternal(contract: IContract, deliverable: ContractDeliverable, message: string): Promise<DeliverableResponseDTO> {

    const escrow = await this._escrowRepository.findOneByContractIdAndStatus(contract._id?.toString() || '', 'held');
    if (!escrow) throw new AppError('No held escrow found', HttpStatus.BAD_REQUEST);


    const released = await this._escrowRepository.releaseEscrow(escrow.escrowId);
    if (!released) throw new AppError('Failed to release escrow', HttpStatus.INTERNAL_SERVER_ERROR);

    const freelancer = await this._userRepository.updateWalletBalance(contract.freelancerId.toString(), escrow.amount);
    if (!freelancer) throw new AppError('Freelancer not found', HttpStatus.NOT_FOUND);


    await this._transactionRepository.createTransaction({
      contractId: new Types.ObjectId(contract._id?.toString() || ''),
      paymentId: escrow.paymentId,
      fromUserId: contract.clientId,
      toUserId: contract.freelancerId,
      type: 'credit',
      purpose: 'contract_funding',
      amount: escrow.amount,
      description: `Payment for approved deliverable - ${contract.title}`,
      metadata: { deliverableId: deliverable._id?.toString(), escrowId: escrow.escrowId, approvalMessage: message },
    });


    const updatedContract = await this._contractRepository.approveDeliverable(contract._id?.toString() || '', deliverable._id?.toString() || '', message);
    if (!updatedContract) throw new AppError('Failed to approve deliverable', HttpStatus.INTERNAL_SERVER_ERROR);


    const newTotalPaid = (updatedContract.totalPaid || 0) + escrow.amount;
    const newBalance = (updatedContract.fundedAmount || 0) - newTotalPaid;
    const finalContract = await this._contractRepository.updateContractPayment(contract._id?.toString() || '', newTotalPaid, newBalance);


    if ((contract.paymentType === 'fixed' || contract.paymentType === 'fixed_with_milestones')) {
      const remainingEscrow = await this._escrowRepository.findOneByContractIdAndStatus(contract._id?.toString() || '', 'held');
      if (!remainingEscrow) await this._contractRepository.markContractAsCompleted(contract._id?.toString() || '');
    }

    if (!finalContract) throw new AppError('Failed to update contract', HttpStatus.INTERNAL_SERVER_ERROR);
    const approvedDeliverable = finalContract.deliverables?.find(d => d._id?.toString() === deliverable._id?.toString());
    if (!approvedDeliverable) throw new AppError('Failed to retrieve approved deliverable', HttpStatus.INTERNAL_SERVER_ERROR);

    return {
      id: approvedDeliverable._id?.toString() || '',
      submittedBy: approvedDeliverable.submittedBy.toString(),
      files: approvedDeliverable.files,
      message: approvedDeliverable.message,
      status: approvedDeliverable.status,
      version: approvedDeliverable.version,
      submittedAt: approvedDeliverable.submittedAt.toISOString(),
      approvedAt: approvedDeliverable.approvedAt?.toISOString(),
      revisionsRequested: approvedDeliverable.revisionsRequested,
    };
  }


  async approveDeliverable(clientId: string, contractId: string, data: ApproveDeliverableDTO): Promise<DeliverableResponseDTO> {
    if (!Types.ObjectId.isValid(clientId)) throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    if (!Types.ObjectId.isValid(contractId)) throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    if (!Types.ObjectId.isValid(data.deliverableId)) throw new AppError('Invalid deliverableId', HttpStatus.BAD_REQUEST);

    const contract = await this._contractRepository.findById(contractId);
    if (!contract) throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    if (contract.clientId.toString() !== clientId) throw new AppError('Unauthorized', HttpStatus.FORBIDDEN);
    if (contract.status !== 'active') throw new AppError('Contract must be active', HttpStatus.BAD_REQUEST);

    const deliverable = contract.deliverables?.find((d) => d._id?.toString() === data.deliverableId);
    if (!deliverable) throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    if (deliverable.status === 'approved') throw new AppError('Deliverable already approved', HttpStatus.BAD_REQUEST);

    return this.approveDeliverableInternal(contract, deliverable, data.message || 'Approved by client');
  }


  async autoApprovePendingDeliverables(): Promise<void> {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const contracts = await this._contractRepository.findContractsWithPendingDeliverables(threeDaysAgo);

    for (const contract of contracts) {
      const pendingDeliverables = contract.deliverables?.filter((d: any) => d.status === 'submitted' && new Date(d.submittedAt) <= threeDaysAgo) || [];
      for (const deliverable of pendingDeliverables) {
        try {
          await this.approveDeliverableInternal(contract, deliverable, 'Auto-approved by system');
        } catch (error) {
          console.error(`Failed to auto-approve deliverable ${deliverable._id?.toString()} for contract ${contract._id?.toString()}:`, error);
        }
      }
    }
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

    // if(contract.remainingRevisions !== undefined && contract.remainingRevisions <= 0) {
    //   throw new AppError('No remaining revisions allowed for this contract', HttpStatus.BAD_REQUEST);
    // }

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

    // enforce revision limits using strategy

  

    const strategy = this._deliverableChangeStrategyFactory.getStrategy(contract.paymentType || '');


    const allowedRevisions = strategy.getAllowedRevisions(contract, deliverable) || 0;

    if (allowedRevisions <= 0) {
      throw new AppError('Revision limit reached for this deliverable', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.requestDeliverableChanges(
      contractId,
      data.deliverableId,
      data.message,
      undefined,
      contract.paymentType,
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

      const isAllMilestonesPaid = await this._contractRepository.isAllMilestonesPaid(contractId);

      if (isAllMilestonesPaid) {
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

  async respondToContractExtension(
    clientId: string,
    contractId: string,
    data: RespondToContractExtensionDTO,
  ): Promise<ContractExtensionResponseDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError(
        'You are not authorized to respond to extension for this contract',
        HttpStatus.FORBIDDEN,
      );
    }

    if (!contract.extensionRequest || contract.extensionRequest.status !== 'pending') {
      throw new AppError('No pending extension request found', HttpStatus.BAD_REQUEST);
    }

    const updatedContract = await this._contractRepository.respondToContractExtension(
      contractId,
      data.approved,
      data.responseMessage,
    );

    if (!updatedContract) {
      throw new AppError('Failed to respond to extension request', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const action = data.approved ? 'contract_extension_approved' : 'contract_extension_rejected';
    await this._contractRepository.addTimelineEntry(
      contractId,
      action,
      clientId,
      undefined,
      `Contract extension ${data.approved ? 'approved' : 'rejected'}`,
    );

    if (!updatedContract.extensionRequest) {
      throw new AppError(
        'Failed to retrieve extension response',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return ClientContractExtensionMapper.toContractExtensionResponseDTO(
      updatedContract.extensionRequest,
    );
  }

  async downloadDeliverableFiles(
    clientId: string,
    contractId: string,
    data: DownloadDeliverableDTO,
  ): Promise<archiver.Archiver> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contractId', HttpStatus.BAD_REQUEST);
    }

    const contract = await this._contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError(
        'You are not authorized to download deliverables for this contract',
        HttpStatus.FORBIDDEN,
      );
    }

    const deliverable = contract.deliverables?.find(
      (d) => d._id?.toString() === data.deliverableId,
    );

    if (!deliverable) {
      throw new AppError('Deliverable not found', HttpStatus.NOT_FOUND);
    }

    if (!deliverable.files || deliverable.files.length === 0) {
      throw new AppError('No files found in this deliverable', HttpStatus.BAD_REQUEST);
    }

    const files: FileDownloadInput[] = deliverable.files.map((file) => ({
      url: file.fileUrl,
      originalName: file.fileName,
    }));

    return this._fileDownloadService.getDeliverablesZip(files);
  }
}
