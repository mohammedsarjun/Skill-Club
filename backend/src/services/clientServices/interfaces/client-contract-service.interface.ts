import {
  ClientContractDetailDTO,
  ClientContractListResultDTO,
  ClientContractQueryParamsDTO,
} from '../../../dto/clientDTO/client-contract.dto';

export interface IClientContractService {
  getContractDetail(clientId: string, contractId: string): Promise<ClientContractDetailDTO>;
  cancelContract(clientId: string, contractId: string): Promise<{ cancelled: boolean }>;
  getAllContracts(
    clientId: string,
    query: ClientContractQueryParamsDTO,
  ): Promise<ClientContractListResultDTO>;
}
