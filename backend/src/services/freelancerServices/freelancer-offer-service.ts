import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IFreelancerOfferService } from './interfaces/freelancer-offer-service.interface';
import { IOfferRepository, FreelancerOfferQueryParamsDTO } from '../../repositories/interfaces/offer-repository.interface';
import { mapOfferModelToFreelancerOfferDetailDTO } from '../../mapper/freelancerMapper/freelancer-offer.mapper';
import { FreelancerOfferListResultDTO, FreelancerOfferDetailDTO } from '../../dto/freelancerDTO/freelancer-offer.dto';
import { IJobRepository } from '../../repositories/interfaces/job-repository.interface';

@injectable()
export class FreelancerOfferService implements IFreelancerOfferService {
  private _offerRepository: IOfferRepository;
  private _jobRepository: IJobRepository;
  constructor(
    @inject('IOfferRepository') offerRepository: IOfferRepository,
    @inject('IJobRepository') jobRepository: IJobRepository,
  ) {
    this._offerRepository = offerRepository;
    this._jobRepository = jobRepository;
  }

  async getAllOffers(
    freelancerId: string,
    query: FreelancerOfferQueryParamsDTO,
  ): Promise<FreelancerOfferListResultDTO> {
    // sanitize query defaults
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 && query.limit <= 100 ? query.limit : 10;
    const normalized: FreelancerOfferQueryParamsDTO = {
      search: query.search?.trim() || undefined,
      page,
      limit,
      filters: {
        status: query.filters?.status,
        offerType: query.filters?.offerType,
      },
    };

    const [offers, total] = await Promise.all([
      this._offerRepository.findAllForFreelancer(freelancerId, normalized),
      this._offerRepository.countForFreelancer(freelancerId, normalized),
    ]);

    return {
      items: offers.map(mapOfferModelToFreelancerOfferDetailDTO),
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
    };
  }

  async getOfferDetail(
    freelancerId: string,
    offerId: string,
  ): Promise<FreelancerOfferDetailDTO | null> {
    const offer = await this._offerRepository.findOneForFreelancer(freelancerId, offerId);
    if (!offer) return null;
    const dto = mapOfferModelToFreelancerOfferDetailDTO(offer);
    console.log(dto)
    let clientJobsCount: number | undefined;
    const clientId = (offer.clientId as unknown as { _id?: { toString(): string } })._id?.toString();
    if (clientId) {
      clientJobsCount = await this._jobRepository.countAllJobsByClientId(clientId);
    }
    return {
      ...dto,
      clientTotalJobsPosted: clientJobsCount,
    };
  }
}
