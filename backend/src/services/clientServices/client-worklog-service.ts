import { injectable, inject } from 'tsyringe';
import { Types } from 'mongoose';
import { IClientWorklogService } from './interfaces/client-worklog-service.interface';
import { IWorklogRepository } from '../../repositories/interfaces/worklog-repository.interface';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';
import {
  ClientWorklogQueryParamsDTO,
  ClientWorklogListResultDTO,
  ClientWorklogDetailDTO,
  ApproveWorklogDTO,
  RejectWorklogDTO,
} from '../../dto/clientDTO/client-worklog.dto';
import { mapWorklogToListItemDTO, mapWorklogToDetailDTO } from '../../mapper/clientMapper/client-worklog.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';

@injectable()
export class ClientWorklogService implements IClientWorklogService {
  constructor(
    @inject('IWorklogRepository') private worklogRepository: IWorklogRepository,
    @inject('IContractRepository') private contractRepository: IContractRepository
  ) {}

  async getWorklogsByContract(
    clientId: string,
    contractId: string,
    query: ClientWorklogQueryParamsDTO
  ): Promise<ClientWorklogListResultDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid client ID', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contract ID', HttpStatus.BAD_REQUEST);
    }

    const contract = await this.contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('Unauthorized access to contract', HttpStatus.FORBIDDEN);
    }

    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;

    const [worklogs, total] = await Promise.all([
      this.worklogRepository.getWorklogsByContractWithPagination(contractId, page, limit, query.status),
      this.worklogRepository.countWorklogsByContract(contractId, query.status),
    ]);

    const items = worklogs.map(mapWorklogToListItemDTO);

    return {
      items,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async getWorklogDetail(
    clientId: string,
    contractId: string,
    worklogId: string
  ): Promise<ClientWorklogDetailDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid client ID', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contract ID', HttpStatus.BAD_REQUEST);
    }

    const contract = await this.contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('Unauthorized access to contract', HttpStatus.FORBIDDEN);
    }

    const worklog = await this.worklogRepository.getWorklogById(worklogId);

    if (!worklog) {
      throw new AppError('Worklog not found', HttpStatus.NOT_FOUND);
    }

    if (worklog.contractId.toString() !== contractId) {
      throw new AppError('Worklog does not belong to this contract', HttpStatus.BAD_REQUEST);
    }

    const freelancerName = (worklog.freelancerId as unknown as { firstName?: string; lastName?: string })?.firstName
      ? `${(worklog.freelancerId as unknown as { firstName?: string }).firstName} ${(worklog.freelancerId as unknown as { lastName?: string }).lastName || ''}`
      : '';

    return mapWorklogToDetailDTO({ ...worklog.toObject(), freelancerName });
  }

  async approveWorklog(
    clientId: string,
    contractId: string,
    data: ApproveWorklogDTO
  ): Promise<ClientWorklogDetailDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid client ID', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contract ID', HttpStatus.BAD_REQUEST);
    }

    const contract = await this.contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('Unauthorized access to contract', HttpStatus.FORBIDDEN);
    }

    const worklog = await this.worklogRepository.getWorklogById(data.worklogId);

    if (!worklog) {
      throw new AppError('Worklog not found', HttpStatus.NOT_FOUND);
    }

    if (worklog.contractId.toString() !== contractId) {
      throw new AppError('Worklog does not belong to this contract', HttpStatus.BAD_REQUEST);
    }

    if (worklog.status !== 'submitted') {
      throw new AppError('Only submitted worklogs can be approved', HttpStatus.BAD_REQUEST);
    }

    const updatedWorklog = await this.worklogRepository.updateWorklogStatus(
      data.worklogId,
      'approved',
      data.message
    );

    if (!updatedWorklog) {
      throw new AppError('Failed to approve worklog', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const freelancerName = (updatedWorklog.freelancerId as unknown as { firstName?: string; lastName?: string })?.firstName
      ? `${(updatedWorklog.freelancerId as unknown as { firstName?: string }).firstName} ${(updatedWorklog.freelancerId as unknown as { lastName?: string }).lastName || ''}`
      : '';

    return mapWorklogToDetailDTO({ ...updatedWorklog.toObject(), freelancerName });
  }

  async rejectWorklog(
    clientId: string,
    contractId: string,
    data: RejectWorklogDTO
  ): Promise<ClientWorklogDetailDTO> {
    if (!Types.ObjectId.isValid(clientId)) {
      throw new AppError('Invalid client ID', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(contractId)) {
      throw new AppError('Invalid contract ID', HttpStatus.BAD_REQUEST);
    }

    if (!data.message || data.message.trim().length === 0) {
      throw new AppError('Rejection message is required', HttpStatus.BAD_REQUEST);
    }

    const contract = await this.contractRepository.findById(contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('Unauthorized access to contract', HttpStatus.FORBIDDEN);
    }

    const worklog = await this.worklogRepository.getWorklogById(data.worklogId);

    if (!worklog) {
      throw new AppError('Worklog not found', HttpStatus.NOT_FOUND);
    }

    if (worklog.contractId.toString() !== contractId) {
      throw new AppError('Worklog does not belong to this contract', HttpStatus.BAD_REQUEST);
    }

    if (worklog.status !== 'submitted') {
      throw new AppError('Only submitted worklogs can be rejected', HttpStatus.BAD_REQUEST);
    }

    const updatedWorklog = await this.worklogRepository.updateWorklogStatus(
      data.worklogId,
      'rejected',
      data.message
    );

    if (!updatedWorklog) {
      throw new AppError('Failed to reject worklog', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const freelancerName = (updatedWorklog.freelancerId as unknown as { firstName?: string; lastName?: string })?.firstName
      ? `${(updatedWorklog.freelancerId as unknown as { firstName?: string }).firstName} ${(updatedWorklog.freelancerId as unknown as { lastName?: string }).lastName || ''}`
      : '';

    return mapWorklogToDetailDTO({ ...updatedWorklog.toObject(), freelancerName });
  }
}
