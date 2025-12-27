import { injectable, inject } from 'tsyringe';
import { IFreelancerWorklogService } from './interfaces/freelancer-worklog-service.interface';
import { IWorklogRepository } from '../../repositories/interfaces/worklog-repository.interface';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';
import { SubmitWorklogDTO, WorklogResponseDTO } from '../../dto/freelancerDTO/freelancer-worklog.dto';
import { mapWorklogToResponseDTO } from '../../mapper/freelancerMapper/freelancer-worklog.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { Types } from 'mongoose';

@injectable()
export class FreelancerWorklogService implements IFreelancerWorklogService {
  private _worklogRepository: IWorklogRepository;
  private _contractRepository: IContractRepository;

  constructor(
    @inject('IWorklogRepository') worklogRepository: IWorklogRepository,
    @inject('IContractRepository') contractRepository: IContractRepository
  ) {
    this._worklogRepository = worklogRepository;
    this._contractRepository = contractRepository;
  }

  async submitWorklog(freelancerId: string, data: SubmitWorklogDTO): Promise<WorklogResponseDTO> {
    const contract = await this._contractRepository.findDetailByIdForFreelancer(data.contractId, freelancerId);

    if (!contract) {
      throw new AppError('Contract not found or unauthorized', HttpStatus.NOT_FOUND);
    }

    if (contract.status !== 'active') {
      throw new AppError('Contract must be active to submit worklogs', HttpStatus.BAD_REQUEST);
    }

    if (data.files.length === 0) {
      throw new AppError('At least one proof of work file is required', HttpStatus.BAD_REQUEST);
    }

    if (data.duration <= 0) {
      throw new AppError('Duration must be greater than zero', HttpStatus.BAD_REQUEST);
    }

    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - data.duration);

    const worklog = await this._worklogRepository.createWorklog({
      contractId: new Types.ObjectId(data.contractId),
      milestoneId: data.milestoneId ? new Types.ObjectId(data.milestoneId) : undefined,
      freelancerId: new Types.ObjectId(freelancerId),
      startTime,
      endTime,
      duration: data.duration,
      files: data.files,
      description: data.description,
      status: 'submitted',
    });

    return mapWorklogToResponseDTO(worklog);
  }

  async getWorklogsByContract(freelancerId: string, contractId: string): Promise<WorklogResponseDTO[]> {
    const contract = await this._contractRepository.findDetailByIdForFreelancer(contractId, freelancerId);

    if (!contract) {
      throw new AppError('Contract not found or unauthorized', HttpStatus.NOT_FOUND);
    }

    const worklogs = await this._worklogRepository.getWorklogsByContractId(contractId);
    return worklogs.map(mapWorklogToResponseDTO);
  }
}
