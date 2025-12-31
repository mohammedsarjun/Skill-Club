import BaseRepository from '../baseRepositories/base-repository';
import { IContract } from '../../models/interfaces/contract.model.interface';
import { ClientContractQueryParamsDTO } from '../../dto/clientDTO/client-contract.dto';
import { FreelancerContractQueryParamsDTO } from '../../dto/freelancerDTO/freelancer-contract.dto';
import { AdminContractQueryParamsDTO } from '../../dto/adminDTO/admin-contract.dto';
import { ClientSession } from 'mongoose';

export interface IContractRepository extends BaseRepository<IContract> {
  createContract(data: Partial<IContract>): Promise<IContract>;
  findByOfferId(offerId: string): Promise<IContract | null>;
  updateStatusById(contractId: string, status: IContract['status'], session?: ClientSession): Promise<IContract | null>;
 
  findContractDetailByIdForClient(contractId: string, clientId: string): Promise<IContract | null>;
  findAllForClient(clientId: string, query: ClientContractQueryParamsDTO): Promise<IContract[]>;
  countForClient(clientId: string, query: ClientContractQueryParamsDTO): Promise<number>;
  findAllForFreelancer(
    freelancerId: string,
    query: FreelancerContractQueryParamsDTO,
  ): Promise<IContract[]>;
  countForFreelancer(
    freelancerId: string,
    query: FreelancerContractQueryParamsDTO,
  ): Promise<number>;
  findAllForAdmin(query: AdminContractQueryParamsDTO): Promise<IContract[]>;
  countForAdmin(query: AdminContractQueryParamsDTO): Promise<number>;
  findDetailByIdForAdmin(contractId: string): Promise<IContract | null>;
  findDetailByIdForFreelancer(contractId: string, freelancerId: string): Promise<IContract | null>;
  submitDeliverable(
    contractId: string,
    submittedBy: string,
    files: { fileName: string; fileUrl: string }[],
    message: string | undefined,
  ): Promise<IContract | null>;
  approveDeliverable(
    contractId: string,
    deliverableId: string,
    message?: string,
  ): Promise<IContract | null>;
  requestDeliverableChanges(
    contractId: string,
    deliverableId: string,
    message: string,
    milestoneId: string | undefined,
    contractType: string,
  ): Promise<IContract | null>;
  updateContractPayment(
    contractId: string,
    totalPaid: number,
    balance: number,
  ): Promise<IContract | null>;
  markContractAsCompleted(contractId: string): Promise<IContract | null>;
  submitMilestoneDeliverable(
    contractId: string,
    milestoneId: string,
    submittedBy: string,
    files: { fileName: string; fileUrl: string }[],
    message: string | undefined,
  ): Promise<IContract | null>;
  approveMilestoneDeliverable(
    contractId: string,
    milestoneId: string,
    deliverableId: string,
    message?: string,
  ): Promise<IContract | null>;
  requestMilestoneChanges(
    contractId: string,
    milestoneId: string,
    deliverableId: string,
    message: string,
  ): Promise<IContract | null>;
  requestMilestoneExtension(
    contractId: string,
    milestoneId: string,
    requestedBy: string,
    requestedDeadline: Date,
    reason: string,
  ): Promise<IContract | null>;
  respondToMilestoneExtension(
    contractId: string,
    milestoneId: string,
    approved: boolean,
    responseMessage?: string,
  ): Promise<IContract | null>;
  requestContractExtension(
    contractId: string,
    requestedBy: string,
    requestedDeadline: Date,
    reason: string,
  ): Promise<IContract | null>;
  respondToContractExtension(
    contractId: string,
    approved: boolean,
    responseMessage?: string,
  ): Promise<IContract | null>;
  updateMilestoneStatus(
    contractId: string,
    milestoneId: string,
    status: string,
    session?: ClientSession,
  ): Promise<IContract | null>;
  addTimelineEntry(
    contractId: string,
    action: string,
    performedBy: string,
    milestoneId?: string,
    details?: string,
  ): Promise<IContract | null>;
  findContractsWithPendingDeliverables(threeDaysAgo: Date): Promise<IContract[]>;

  isAllMilestonesPaid(contractId: string): Promise<boolean>;
  // `updateById` is provided by BaseRepository with a generic return type.
  // No need to redeclare it here to avoid signature incompatibilities.
}
