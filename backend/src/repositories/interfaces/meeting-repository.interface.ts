import { ClientSession } from 'mongoose';
import BaseRepository from '../baseRepositories/base-repository';
import { IMeeting } from '../../models/interfaces/meeting.model.interface';
import { FreelancerMeetingQueryParamsDTO } from '../../dto/freelancerDTO/freelancer-meeting.dto';

export interface IMeetingRepository extends BaseRepository<IMeeting> {
  createMeeting(meetingData: Partial<IMeeting>, session?: ClientSession): Promise<IMeeting>;
  findConflictingMeetings(contractId: string, scheduledAt: Date, durationMinutes: number): Promise<IMeeting[]>;
  isMeetingAlreadyProposed(
    contractId: string,
    type: 'milestone' | 'fixed',
    milestoneId?: string,
    deliverablesId?: string
  ): Promise<boolean>;
  findAllForFreelancer(
    freelancerContractIds: string[],
    query: FreelancerMeetingQueryParamsDTO,
  ): Promise<IMeeting[]>;
  countForFreelancer(
    freelancerContractIds: string[],
    query: FreelancerMeetingQueryParamsDTO,
  ): Promise<number>;
  findDetailByIdForFreelancer(meetingId: string, freelancerContractIds: string[]): Promise<IMeeting | null>;
  acceptMeeting(meetingId: string): Promise<IMeeting | null>;
  requestReschedule(meetingId: string, proposedTime: Date): Promise<IMeeting | null>;
}