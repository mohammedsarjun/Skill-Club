import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientFreelancerService } from './interfaces/client-freelancer-service.interface';
import { IFreelancerRepository } from '../../repositories/interfaces/freelancer-repository.interface';
import {
  ClientFreelancerResponseDto,
  FetchClientFreelancerDTO,
  freelancerParams,
} from '../../dto/clientDTO/client-freelancer.dto';
import { mapFreelancerToFetchClientFreelancerDTO, mapUserModelToClientFreelancerResponseDto } from '../../mapper/clientMapper/client-freelancer.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';

@injectable()
export class ClientFreelancerService implements IClientFreelancerService {
  private _freelancerRepository: IFreelancerRepository;
  constructor(@inject('IFreelancerRepository') freelancerRepository: IFreelancerRepository) {
    this._freelancerRepository = freelancerRepository;
  }

  async getAllFreelancers(
    clientUserId: string,
    queryFilter: freelancerParams,
  ): Promise<ClientFreelancerResponseDto[] | null> {
    const freelancerData = await this._freelancerRepository.getAllFreelancers(
      clientUserId,
      queryFilter,
    );

    const freelancerDto = freelancerData?.map(mapUserModelToClientFreelancerResponseDto);

    return freelancerDto ? freelancerDto : null;
  }

  async getFreelancerDetail(
    clientUserId: string,
    freelancerId: string,
  ): Promise<FetchClientFreelancerDTO| null> {

    if(clientUserId==freelancerId){
      throw new AppError("You cannot view your own freelancer profile.",HttpStatus.BAD_REQUEST)
    }
    const freelancerData = await this._freelancerRepository.getFreelacerByIdForClient(freelancerId);
    console.log(freelancerData)
    const freelancerDto = mapFreelancerToFetchClientFreelancerDTO(freelancerData!)

    return freelancerDto
  }
}
