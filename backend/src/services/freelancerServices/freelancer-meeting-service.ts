import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IFreelancerMeetingService } from './interfaces/freelancer-meeting-service.interface';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';
import { IMeetingRepository } from '../../repositories/interfaces/meeting-repository.interface';
import {
  FreelancerMeetingListResultDTO,
  FreelancerMeetingQueryParamsDTO,
  FreelancerMeetingDetailDTO,
  AcceptMeetingDTO,
  RequestRescheduleDTO,
} from '../../dto/freelancerDTO/freelancer-meeting.dto';
import {
  mapMeetingToFreelancerListItemDTO,
  mapMeetingToFreelancerDetailDTO,
} from '../../mapper/freelancerMapper/freelancer-meeting.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { Types } from 'mongoose';

@injectable()
export class FreelancerMeetingService implements IFreelancerMeetingService {
  private _contractRepository: IContractRepository;
  private _meetingRepository: IMeetingRepository;

  constructor(
    @inject('IContractRepository') contractRepository: IContractRepository,
    @inject('IMeetingRepository') meetingRepository: IMeetingRepository,
  ) {
    this._contractRepository = contractRepository;
    this._meetingRepository = meetingRepository;
  }

  async getAllMeetings(
    freelancerId: string,
    query: FreelancerMeetingQueryParamsDTO,
  ): Promise<FreelancerMeetingListResultDTO> {
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new AppError('Invalid freelancerId', HttpStatus.BAD_REQUEST);
    }

    const normalizedQuery: FreelancerMeetingQueryParamsDTO = {
      page: query.page && query.page > 0 ? query.page : 1,
      limit: query.limit && query.limit > 0 ? query.limit : 10,
      status: query.status,
    };

    const contracts = await this._contractRepository.findAllForFreelancer(freelancerId, {
      page: 1,
      limit: 1000,
      filters: {},
    });

    const contractIds = contracts.map((c) => c._id?.toString()).filter((id): id is string => !!id);

    if (contractIds.length === 0) {
      return {
        items: [],
        page: normalizedQuery.page!,
        limit: normalizedQuery.limit!,
        total: 0,
        pages: 0,
      };
    }

    const [meetings, total] = await Promise.all([
      this._meetingRepository.findAllForFreelancer(contractIds, normalizedQuery),
      this._meetingRepository.countForFreelancer(contractIds, normalizedQuery),
    ]);

    const contractMap = new Map(contracts.map((c) => [c._id?.toString(), c]));

    const items = await Promise.all(
      meetings.map(async (meeting) => {
        const contract = contractMap.get(meeting.contractId?.toString() || '');
        if (!contract) {
          throw new AppError('Contract not found for meeting', HttpStatus.NOT_FOUND);
        }

        const populatedContract = await this._contractRepository.findById(contract._id!.toString());
        if (!populatedContract) {
          throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
        }

        return mapMeetingToFreelancerListItemDTO(meeting, populatedContract);
      }),
    );

    return {
      items,
      page: normalizedQuery.page!,
      limit: normalizedQuery.limit!,
      total,
      pages: Math.ceil(total / normalizedQuery.limit!),
    };
  }

  async getMeetingDetail(freelancerId: string, meetingId: string): Promise<FreelancerMeetingDetailDTO> {
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new AppError('Invalid freelancerId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(meetingId)) {
      throw new AppError('Invalid meetingId', HttpStatus.BAD_REQUEST);
    }

    const contracts = await this._contractRepository.findAllForFreelancer(freelancerId, {
      page: 1,
      limit: 1000,
      filters: {},
    });

    const contractIds = contracts.map((c) => c._id?.toString()).filter((id): id is string => !!id);

    if (contractIds.length === 0) {
      throw new AppError('No contracts found for freelancer', HttpStatus.NOT_FOUND);
    }

    const meeting = await this._meetingRepository.findDetailByIdForFreelancer(meetingId, contractIds);

    if (!meeting) {
      throw new AppError('Meeting not found', HttpStatus.NOT_FOUND);
    }

    const contract = await this._contractRepository.findById(meeting.contractId?.toString() || '');

    if (!contract) {
      throw new AppError('Contract not found for meeting', HttpStatus.NOT_FOUND);
    }

    return mapMeetingToFreelancerDetailDTO(meeting, contract);
  }

  async acceptMeeting(freelancerId: string, data: AcceptMeetingDTO): Promise<void> {
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new AppError('Invalid freelancerId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.meetingId)) {
      throw new AppError('Invalid meetingId', HttpStatus.BAD_REQUEST);
    }

    const contracts = await this._contractRepository.findAllForFreelancer(freelancerId, {
      page: 1,
      limit: 1000,
      filters: {},
    });

    const contractIds = contracts.map((c) => c._id?.toString()).filter((id): id is string => !!id);

    const meeting = await this._meetingRepository.findDetailByIdForFreelancer(data.meetingId, contractIds);

    if (!meeting) {
      throw new AppError('Meeting not found', HttpStatus.NOT_FOUND);
    }

    if (meeting.status !== 'proposed') {
      throw new AppError('Only proposed meetings can be accepted', HttpStatus.BAD_REQUEST);
    }

    const updatedMeeting = await this._meetingRepository.acceptMeeting(data.meetingId);

    if (!updatedMeeting) {
      throw new AppError('Failed to accept meeting', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async requestReschedule(freelancerId: string, data: RequestRescheduleDTO): Promise<void> {
    if (!Types.ObjectId.isValid(freelancerId)) {
      throw new AppError('Invalid freelancerId', HttpStatus.BAD_REQUEST);
    }

    if (!Types.ObjectId.isValid(data.meetingId)) {
      throw new AppError('Invalid meetingId', HttpStatus.BAD_REQUEST);
    }

    const contracts = await this._contractRepository.findAllForFreelancer(freelancerId, {
      page: 1,
      limit: 1000,
      filters: {},
    });

    const contractIds = contracts.map((c) => c._id?.toString()).filter((id): id is string => !!id);

    const meeting = await this._meetingRepository.findDetailByIdForFreelancer(data.meetingId, contractIds);

    if (!meeting) {
      throw new AppError('Meeting not found', HttpStatus.NOT_FOUND);
    }

    if (meeting.status !== 'proposed' && meeting.status !== 'accepted') {
      throw new AppError('Only proposed or accepted meetings can be rescheduled', HttpStatus.BAD_REQUEST);
    }

    const updatedMeeting = await this._meetingRepository.requestReschedule(data.meetingId, data.proposedTime);

    if (!updatedMeeting) {
      throw new AppError('Failed to request reschedule', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
