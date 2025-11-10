import { ProposalQueryParamsDTO } from "src/dto/clientDTO/client-proposal.dto";
import { IProposal, ProposalDetail } from "../../models/interfaces/proposal.model.interface";
import BaseRepository from "../baseRepositories/base-repository";

export interface IProposalRepository extends BaseRepository<IProposal> {
  createProposal(proposalData: Partial<ProposalDetail>): Promise<IProposal | null>;
  findOneByFreelancerAndJobId(freelancerId:string,jobId:string): Promise<IProposal | null>;
  findAllByClientId(clientId:string,proposalFilterQuery:ProposalQueryParamsDTO,skip:number):Promise<IProposal[]|null>
}
