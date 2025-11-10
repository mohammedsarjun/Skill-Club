// import { injectable, inject } from 'tsyringe';
// import '../../config/container';
// // import AppError from '../../utils/app-error';
// // import { HttpStatus } from '../../enums/http-status.enum';
// import { IClientProposalService } from './interfaces/client-proposal-service.interface';
// // import { ProposalQueryParamsDTO } from 'src/dto/clientDTO/client-proposal.dto';
// import { IProposalRepository } from 'src/repositories/interfaces/proposal-repository.interface';
// // import { mapRawQueryFiltersToProposalQueryParamsDTO } from 'src/mapper/clientMapper/client-proposal.mapper';
// // import { ERROR_MESSAGES } from 'src/contants/error-constants';

// @injectable()
// export class ClientProposalService implements IClientProposalService {
//   private _proposalRepository: IProposalRepository;
//   constructor(@inject('IProposalRepository') proposalRepository: IProposalRepository) {
//     this._proposalRepository = proposalRepository;
//   }

//   async getAllProposal(_clientId: string, _queryFilters: Record<string, unknown>): Promise<void> {
//   //   const proposalQueryDto = mapRawQueryFiltersToProposalQueryParamsDTO(queryFilters);

//   //   const skip =
//   //     (proposalQueryDto?.page ? proposalQueryDto?.page - 1 : 0) * (proposalQueryDto.limit ? proposalQueryDto?.limit : 5);

//   //   const proposalResponse = await this._proposalRepository.findAllByClientId(
//   //     clientId,
//   //     proposalQueryDto,
//   //     skip,
//   //   );

//   //   if (!proposalResponse) {
//   //     throw new AppError(ERROR_MESSAGES.PROPOSAL.NOT_FOUND, HttpStatus.NOT_FOUND);
//   //   }

    
//   //   const total = await this._proposalRepository.countAllProposalsByClientId(clientId);

//   //   return {
//   //     data: JobResponseDTO,
//   //     total,
//   //     page: JobQueryDto.page,
//   //     limit: JobQueryDto.limit,
//   //   }
//   }
// }
