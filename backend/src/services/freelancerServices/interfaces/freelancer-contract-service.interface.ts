import {
  FreelancerContractListResultDTO,
  FreelancerContractQueryParamsDTO,
} from '../../../dto/freelancerDTO/freelancer-contract.dto';

export interface IFreelancerContractService {
  getAllContracts(
    freelancerId: string,
    query: FreelancerContractQueryParamsDTO,
  ): Promise<FreelancerContractListResultDTO>;
}
