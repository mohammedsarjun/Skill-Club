import { CreateProposalRequestDto } from '../../../dto/freelancerDTO/freelancer-proposal.dto';

export interface IFreelancerProposalService {
  createProposal(freelancerId:string,proposalData: CreateProposalRequestDto): Promise<void>;
}
