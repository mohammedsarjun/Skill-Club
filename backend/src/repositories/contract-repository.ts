import BaseRepository from './baseRepositories/base-repository';
import { IContract } from '../models/interfaces/contract.model.interface';
import { Contract } from '../models/contract.model';
import { IContractRepository } from './interfaces/contract-repository.interface';
import { ClientContractQueryParamsDTO } from '../dto/clientDTO/client-contract.dto';
import { FreelancerContractQueryParamsDTO } from '../dto/freelancerDTO/freelancer-contract.dto';

export class ContractRepository extends BaseRepository<IContract> implements IContractRepository {
  constructor() {
    super(Contract);
  }

  async createContract(data: Partial<IContract>): Promise<IContract> {
    return await super.create(data);
  }

  async findByOfferId(offerId: string): Promise<IContract | null> {
    return await super.findOne({ offerId });
  }

  async findContractDetailByIdForClient(contractId: string, clientId: string): Promise<IContract | null> {
    return await this.findOne(
      { _id: contractId, clientId },
      {
        populate: [
          { path: 'clientId', select: 'firstName lastName logo companyName country' },
          { path: 'freelancerId', select: 'firstName lastName logo country rating' },
          { path: 'jobId', select: 'title' },
          { path: 'offerId', select: 'offerType' },
        ],
      },
    );
  }

  async updateStatusById(contractId: string, status: IContract['status']): Promise<IContract | null> {
    return await this.updateById(contractId, { status });
  }

  async findAllForClient(clientId: string, query: ClientContractQueryParamsDTO): Promise<IContract[]> {
    const { search, filters } = query;
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { clientId };
    if (filters?.status) filter.status = filters.status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    return await super.findAll(filter, {
      skip,
      limit,
      populate: { path: 'freelancerId', select: '_id firstName lastName freelancerProfile.logo' },
    });
  }

  async countForClient(clientId: string, query: ClientContractQueryParamsDTO): Promise<number> {
    const { search, filters } = query;
    const filter: Record<string, unknown> = { clientId };
    if (filters?.status) filter.status = filters.status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    return await super.count(filter);
  }

  async findAllForFreelancer(freelancerId: string, query: FreelancerContractQueryParamsDTO): Promise<IContract[]> {
    const { search, filters } = query;
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { freelancerId };
    if (filters?.status) filter.status = filters.status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    return await super.findAll(filter, {
      skip,
      limit,
      populate: { path: 'clientId', select: '_id firstName lastName companyName logo' },
    });
  }

  async countForFreelancer(freelancerId: string, query: FreelancerContractQueryParamsDTO): Promise<number> {
    const { search, filters } = query;
    const filter: Record<string, unknown> = { freelancerId };
    if (filters?.status) filter.status = filters.status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    return await super.count(filter);
  }
}
