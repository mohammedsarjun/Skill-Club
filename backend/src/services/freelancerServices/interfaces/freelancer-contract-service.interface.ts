import {
  FreelancerContractListResultDTO,
  FreelancerContractQueryParamsDTO,
  FreelancerContractDetailDTO,
} from '../../../dto/freelancerDTO/freelancer-contract.dto';

export interface IFreelancerContractService {
  getAllContracts(
    freelancerId: string,
    query: FreelancerContractQueryParamsDTO,
  ): Promise<FreelancerContractListResultDTO>;
  getContractDetail(freelancerId: string, contractId: string): Promise<FreelancerContractDetailDTO>;
}
