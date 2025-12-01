import {
  FreelancerContractListResultDTO,
  FreelancerContractQueryParamsDTO,
  FreelancerContractDetailDTO,
} from '../../../dto/freelancerDTO/freelancer-contract.dto';
import { DeliverableResponseDTO, SubmitDeliverableDTO } from '../../../dto/freelancerDTO/freelancer-deliverable.dto';

export interface IFreelancerContractService {
  getAllContracts(
    freelancerId: string,
    query: FreelancerContractQueryParamsDTO,
  ): Promise<FreelancerContractListResultDTO>;
  getContractDetail(freelancerId: string, contractId: string): Promise<FreelancerContractDetailDTO>;
  submitDeliverable(
    freelancerId: string,
    contractId: string,
    data: SubmitDeliverableDTO,
  ): Promise<DeliverableResponseDTO>;
}
