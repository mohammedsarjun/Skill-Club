import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientOfferService } from './interfaces/client-offer-service.interface';
import { ClientOfferRequestDTO, ClientOfferResponseDTO } from '../../dto/clientDTO/client-offer.dto';
import { validateData } from '../../utils/validation';
import { offerValidationSchema } from '../../utils/validationSchemas/offer-validation';
import { IOfferRepository } from '../../repositories/interfaces/offer-repository.interface';
import { IProposalRepository } from '../../repositories/interfaces/proposal-repository.interface';
import { DirectOfferStrategy } from './offerStrategies/direct-offer-strategy';
import { ProposalOfferStrategy } from './offerStrategies/proposal-offer-strategy';
import { IOfferCreationStrategy } from './offerStrategies/offer-creation-strategy.interface';
import { mapOfferModelToClientOfferResponseDTO } from '../../mapper/clientMapper/client-offer.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { Types } from 'mongoose';

@injectable()
export class ClientOfferService implements IClientOfferService {
  private _offerRepository: IOfferRepository;
  private _proposalRepository: IProposalRepository;
  constructor(
    @inject('IOfferRepository') offerRepository: IOfferRepository,
    @inject('IProposalRepository') proposalRepository: IProposalRepository,
  ) {
    this._offerRepository = offerRepository;
    this._proposalRepository = proposalRepository;
  }

  async createOffer(clientId: string, offerData: ClientOfferRequestDTO): Promise<ClientOfferResponseDTO> {
    console.log(offerData)
    const parsed = validateData(offerValidationSchema, offerData);


    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid clientId', HttpStatus.BAD_REQUEST);
    }

 
    if (!parsed.freelancerId || !Types.ObjectId.isValid(parsed.freelancerId)) {
      throw new AppError('Invalid freelancerId provided', HttpStatus.BAD_REQUEST);
    }
    if (parsed.proposalId && !Types.ObjectId.isValid(parsed.proposalId)) {
      throw new AppError('Invalid proposalId provided', HttpStatus.BAD_REQUEST);
    }
    if (parsed.jobId && !Types.ObjectId.isValid(parsed.jobId)) {
      throw new AppError('Invalid jobId provided', HttpStatus.BAD_REQUEST);
    }

    // infer offer type if frontend omitted it (common for direct offers)
    const inferredOfferType: 'direct' | 'proposal' = parsed.offerType ?? (parsed.proposalId ? 'proposal' : 'direct');

    let strategy: IOfferCreationStrategy;
    if (inferredOfferType === 'proposal') {
      if (!parsed.proposalId) {
        throw new AppError('Missing proposalId for proposal offer', HttpStatus.BAD_REQUEST);
      }
      strategy = new ProposalOfferStrategy();
    } else {
      strategy = new DirectOfferStrategy();
    }


    const strategyInput: ClientOfferRequestDTO = {
      ...(parsed as unknown as ClientOfferRequestDTO),
      offerType: inferredOfferType,
    };
    const baseOffer = await strategy.create(clientId, strategyInput);

    // update proposal status when offer was created for a proposal
    if (inferredOfferType === 'proposal' && parsed.proposalId) {
      await this._proposalRepository.updateStatusById(parsed.proposalId, 'offer_sent');
    }

    const created = await this._offerRepository.createOffer(baseOffer);
    return mapOfferModelToClientOfferResponseDTO(created);
  }
}
