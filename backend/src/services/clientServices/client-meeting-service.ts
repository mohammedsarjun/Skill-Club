import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientMeetingService } from './interfaces/client-meeting-service.interface';
import { IMeetingRepository } from '../../repositories/interfaces/meeting-repository.interface';
import { ClientMeetingProposalRequestDTO, ClientMeetingProposalResponseDTO } from '../../dto/clientDTO/client-meeting.dto';
import { mapMeetingToClientMeetingProposalResponseDTO } from '../../mapper/clientMapper/client-meeting.mapper';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';

@injectable()
export class ClientMeetingService implements IClientMeetingService {
  private _meetingRepository: IMeetingRepository;
  private _contractRepository: IContractRepository;
  constructor(
    @inject('IMeetingRepository') meetingRepository: IMeetingRepository,
    @inject('IContractRepository') contractRepository: IContractRepository,
  ) {
    this._meetingRepository = meetingRepository;
    this._contractRepository = contractRepository;
  }

  async proposeMeeting(clientId: string, contractId: string, meetingData: ClientMeetingProposalRequestDTO): Promise<ClientMeetingProposalResponseDTO> {
    if (!meetingData.scheduledAt) {
      throw new AppError('Meeting scheduled time is required', HttpStatus.BAD_REQUEST);
    }

    if (!meetingData.durationMinutes || ![15, 30, 45].includes(meetingData.durationMinutes)) {
      throw new AppError('Duration must be 15, 30, or 45 minutes', HttpStatus.BAD_REQUEST);
    }

    if (!meetingData.type || !['milestone', 'fixed'].includes(meetingData.type)) {
      throw new AppError('Meeting type must be either milestone or fixed', HttpStatus.BAD_REQUEST);
    }

    if (meetingData.type === 'milestone' && !meetingData.milestoneId) {
      throw new AppError('Milestone ID is required for milestone meetings', HttpStatus.BAD_REQUEST);
    }

    // if (meetingData.type === 'fixed' && !meetingData.deliverablesId) {
    //   throw new AppError('Deliverable ID is required for fixed deliverable meetings', HttpStatus.BAD_REQUEST);
    // }

    const contract = await this._contractRepository.findById(contractId);
    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('Unauthorized to create meeting for this contract', HttpStatus.FORBIDDEN);
    }

    const scheduledAt = new Date(meetingData.scheduledAt);
    const now = new Date();
    if (scheduledAt <= now) {
      throw new AppError('Meeting must be scheduled in the future', HttpStatus.BAD_REQUEST);
    }

    // console.log(contractId, meetingData.type, clientId, meetingData.milestoneId, meetingData.deliverableId);

    const isMeetingAlreadyProposed = await this._meetingRepository.isMeetingAlreadyProposed(
      contractId,
      meetingData.type,
      meetingData.milestoneId,
      meetingData.deliverableId
    );



    if(isMeetingAlreadyProposed) {
      throw new AppError(
        'A meeting has already been proposed for this milestone or deliverable',
        HttpStatus.CONFLICT
      );
    }

    const conflicts = await this._meetingRepository.findConflictingMeetings(
      contractId,
      scheduledAt,
      meetingData.durationMinutes
    );

    if (conflicts.length > 0) {
      throw new AppError(
        'A meeting is already scheduled during this time slot',
        HttpStatus.CONFLICT
      );
    }

    console.log("Deliverables ID:", meetingData)

    const meetingPayload: Record<string, unknown> = {
      contractId,
      type: meetingData.type,
      deliverablesId: meetingData.deliverableId,
      scheduledAt,
      durationMinutes: meetingData.durationMinutes,
      meetingLink: meetingData.meetingLink,
      status: 'proposed',
      logs: [
        {
          action: 'Meeting proposed by client',
          userId: clientId,
          role: 'client',
          timestamp: new Date(),
          details: {
            scheduledAt,
            durationMinutes: meetingData.durationMinutes,
            type: meetingData.type,
          },
        },
      ],
    };

    const meeting = await this._meetingRepository.createMeeting(meetingPayload);
    return mapMeetingToClientMeetingProposalResponseDTO(meeting);
  }

  
}
