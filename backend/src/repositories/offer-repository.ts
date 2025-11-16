import BaseRepository from './baseRepositories/base-repository';
import { IOffer } from '../models/interfaces/offer.model.interface';
import { OfferModel } from '../models/offer.model';
import { IOfferRepository, FreelancerOfferQueryParamsDTO } from './interfaces/offer-repository.interface';

export class OfferRepository extends BaseRepository<IOffer> implements IOfferRepository {
  constructor() {
    super(OfferModel);
  }

  async createOffer(data: Partial<IOffer>): Promise<IOffer> {
    return await super.create(data);
  }

  async findAllForFreelancer(
    freelancerId: string,
    query: FreelancerOfferQueryParamsDTO,
  ): Promise<IOffer[]> {
    const { search, filters } = query;
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { freelancerId };
    if (filters?.status) filter.status = filters.status;
    if (filters?.offerType) filter.offerType = filters.offerType;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    return await super.findAll(filter, {
      skip,
      limit,
      populate: { path: 'clientId', select: '_id firstName lastName clientProfile.logo' },
    });
  }

  async countForFreelancer(
    freelancerId: string,
    query: FreelancerOfferQueryParamsDTO,
  ): Promise<number> {
    const { search, filters } = query;
    const filter: Record<string, unknown> = { freelancerId };
    if (filters?.status) filter.status = filters.status;
    if (filters?.offerType) filter.offerType = filters.offerType;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    return await super.count(filter);
  }

  async findOneForFreelancer(
    freelancerId: string,
    offerId: string,
  ): Promise<IOffer | null> {
    return await super.findOne(
      { _id: offerId, freelancerId },
      {
        populate: [
          { path: 'clientId', select: '_id firstName lastName clientProfile.logo clientProfile.companyName address.country' },
          { path: 'jobId', select: '_id title' },
          { path: 'proposalId', select: '_id' },
        ],
      },
    );
  }
}
