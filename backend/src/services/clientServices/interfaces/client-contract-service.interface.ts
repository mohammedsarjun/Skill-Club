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
}
