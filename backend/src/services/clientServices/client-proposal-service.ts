import { injectable, inject } from 'tsyringe';
import '../../config/container';
// import AppError from '../../utils/app-error';
// import { HttpStatus } from '../../enums/http-status.enum';
import { IClientProposalService } from './interfaces/client-proposal-service.interface';
// import { ProposalQueryParamsDTO } from 'src/dto/clientDTO/client-proposal.dto';
import { IProposalRepository } from '../../repositories/interfaces/proposal-repository.interface';
import { mapProposalModelToClientProposalResponseDTO, mapRawQueryFiltersToProposalQueryParamsDTO } from '../../mapper/clientMapper/client-proposal.mapper';
import { ClientProposalResponseDTO } from '../../dto/clientDTO/client-proposal.dto';
// import { mapRawQueryFiltersToProposalQueryParamsDTO } from 'src/mapper/clientMapper/client-proposal.mapper';
// import { ERROR_MESSAGES } from 'src/contants/error-constants';

@injectable()
export class ClientProposalService implements IClientProposalService {
  private _proposalRepository: IProposalRepository;
  constructor(@inject('IProposalRepository') proposalRepository: IProposalRepository) {
    this._proposalRepository = proposalRepository;
  }

  async getAllProposal(clientId: string, jobId: string, queryFilters: Record<string, unknown>): Promise<ClientProposalResponseDTO[]|null> {
    const proposalQueryDto = mapRawQueryFiltersToProposalQueryParamsDTO(queryFilters);

    const skip =
      (proposalQueryDto?.page ? proposalQueryDto?.page - 1 : 0) * (proposalQueryDto.limit ? proposalQueryDto?.limit : 5);
      console.log(clientId, jobId)
    const proposalResponse = await this._proposalRepository.findAllByJobAndClientId(
      clientId,
      jobId,
      proposalQueryDto,
      skip,
    );

    const proposalResponseDTO = proposalResponse?.map(mapProposalModelToClientProposalResponseDTO)

    return proposalResponseDTO || null;

}
   async getProposalDetail( proposalId: string): Promise<ClientProposalResponseDTO|null> {
    const proposal =  await this._proposalRepository.findOneById(proposalId);
    if (!proposal) {
      return null;
    }
    return mapProposalModelToClientProposalResponseDTO(proposal);
  }

  
}