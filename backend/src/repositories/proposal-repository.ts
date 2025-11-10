import { proposalModel } from '../models/proposal.model';
import BaseRepository from './baseRepositories/base-repository';
import { IProposal, ProposalDetail } from '../models/interfaces/proposal.model.interface';
import { IProposalRepository } from './interfaces/proposal-repository.interface';
import { ProposalQueryParamsDTO } from 'src/dto/clientDTO/client-proposal.dto';

export class ProposalRepository extends BaseRepository<IProposal> implements IProposalRepository {
  constructor() {
    super(proposalModel);
  }

  async createProposal(proposalData: Partial<ProposalDetail>): Promise<IProposal | null> {
    return await super.create(proposalData);
  }

  async findOneByFreelancerAndJobId(
    freelancerId: string,
    jobId: string,
  ): Promise<IProposal | null> {
    return await super.findOne({ freelancerId, jobId });
  }

  async findAllByClientId(
    clientId: string,
    proposalFilterQuery: ProposalQueryParamsDTO,
    skip: number,
  ): Promise<IProposal[] | null> {
    return await super.findAll(
      { clientId: clientId, title: { $regex: proposalFilterQuery.search, $options: 'i' }, status:proposalFilterQuery.filters },
      {
        skip,
        limit: proposalFilterQuery.limit,
      },
    );
  }
}
