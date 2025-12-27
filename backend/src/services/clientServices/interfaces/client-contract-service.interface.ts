import {
  ClientContractDetailDTO,
  ClientContractListResultDTO,
  ClientContractQueryParamsDTO,
} from '../../../dto/clientDTO/client-contract.dto';
import {
  DeliverableResponseDTO,
  ApproveDeliverableDTO,
  RequestChangesDTO,
} from '../../../dto/clientDTO/client-deliverable.dto';
import {
  ApproveMilestoneDeliverableDTO,
  RequestMilestoneChangesDTO,
  RespondToExtensionDTO,
  MilestoneDeliverableResponseDTO,
  MilestoneExtensionResponseDTO,
  ClientMilestonesDetailDTO,
} from '../../../dto/clientDTO/client-milestone.dto';

export interface IClientContractService {
  getContractDetail(clientId: string, contractId: string): Promise<ClientContractDetailDTO>;
  cancelContract(clientId: string, contractId: string): Promise<{ cancelled: boolean }>;
  getAllContracts(
    clientId: string,
    query: ClientContractQueryParamsDTO,
  ): Promise<ClientContractListResultDTO>;
  approveDeliverable(
    clientId: string,
    contractId: string,
    data: ApproveDeliverableDTO,
  ): Promise<DeliverableResponseDTO>;
  requestDeliverableChanges(
    clientId: string,
    contractId: string,
    data: RequestChangesDTO,
  ): Promise<DeliverableResponseDTO>;
  approveMilestoneDeliverable(
    clientId: string,
    contractId: string,
    data: ApproveMilestoneDeliverableDTO,
  ): Promise<MilestoneDeliverableResponseDTO>;
  requestMilestoneChanges(
    clientId: string,
    contractId: string,
    data: RequestMilestoneChangesDTO,
  ): Promise<MilestoneDeliverableResponseDTO>;
  respondToMilestoneExtension(
    clientId: string,
    contractId: string,
    data: RespondToExtensionDTO,
  ): Promise<MilestoneExtensionResponseDTO>;
  getMilestoneDetail(
    clientId: string,
    contractId: string,
    milestoneId: string,
  ): Promise<ClientMilestonesDetailDTO>;
}
