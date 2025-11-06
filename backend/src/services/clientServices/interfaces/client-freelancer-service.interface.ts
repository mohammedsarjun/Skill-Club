import {
  ClientFreelancerResponseDto,
  FetchClientFreelancerDTO,
  freelancerParams,
} from '../../../dto/clientDTO/client-freelancer.dto';

export interface IClientFreelancerService {
  getAllFreelancers(
    clientUserId: string,
    queryFilter: freelancerParams,
  ): Promise<ClientFreelancerResponseDto[] | null>;
  getFreelancerDetail(
    clientUserId: string,
    freelancerId: string,
  ): Promise<FetchClientFreelancerDTO| null>;
}
