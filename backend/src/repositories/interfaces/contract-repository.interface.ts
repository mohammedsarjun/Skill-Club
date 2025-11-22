import BaseRepository from '../baseRepositories/base-repository';
import { IContract } from '../../models/interfaces/contract.model.interface';
import { ClientContractQueryParamsDTO } from '../../dto/clientDTO/client-contract.dto';
import { FreelancerContractQueryParamsDTO } from '../../dto/freelancerDTO/freelancer-contract.dto';

export interface IContractRepository extends BaseRepository<IContract> {
  createContract(data: Partial<IContract>): Promise<IContract>;
  findByOfferId(offerId: string): Promise<IContract | null>;
  updateStatusById(contractId: string, status: IContract['status']): Promise<IContract | null>;
  findContractDetailByIdForClient(contractId: string, clientId: string): Promise<IContract | null>;
  findAllForClient(clientId: string, query: ClientContractQueryParamsDTO): Promise<IContract[]>;
  countForClient(clientId: string, query: ClientContractQueryParamsDTO): Promise<number>;
  findAllForFreelancer(freelancerId: string, query: FreelancerContractQueryParamsDTO): Promise<IContract[]>;
  countForFreelancer(freelancerId: string, query: FreelancerContractQueryParamsDTO): Promise<number>;
}
