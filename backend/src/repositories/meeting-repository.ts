import BaseRepository from './baseRepositories/base-repository';
import meetingModel from '../models/meeting.model';
import { IMeeting } from '../models/interfaces/meeting.model.interface';
import { IMeetingRepository } from './interfaces/meeting-repository.interface';
import { ClientSession, Types } from 'mongoose';
import { FreelancerMeetingQueryParamsDTO } from '../dto/freelancerDTO/freelancer-meeting.dto';

export class MeetingRepository extends BaseRepository<IMeeting> implements IMeetingRepository {
  constructor() {
    super(meetingModel);
  }

  async createMeeting(data: Partial<IMeeting>, session?: ClientSession): Promise<IMeeting> {
    const meeting = session ? await this.create(data, session) : await this.create(data);
    return meeting;
  }

  async findConflictingMeetings(contractId: string, scheduledAt: Date, durationMinutes: number): Promise<IMeeting[]> {
    const meetingEndTime = new Date(scheduledAt.getTime() + durationMinutes * 60 * 1000);
    
    const conflicts = await this.model.find({
      contractId,
      status: { $in: ['proposed', 'accepted'] },
      $or: [
        {
          scheduledAt: { $lt: meetingEndTime },
          $expr: {
            $gt: [
              { $add: ['$scheduledAt', { $multiply: ['$durationMinutes', 60000] }] },
              scheduledAt
            ]
          }
        }
      ]
    });

    return conflicts;
  }

   async isMeetingAlreadyProposed(contractId: string, type: 'milestone' | 'fixed', milestoneId?: string, deliverablesId?: string): Promise<boolean> {
    const query = {
      contractId:new Types.ObjectId(contractId),
      type,
      status: 'proposed',
    };

    if (type === 'milestone' && milestoneId) {
      Object.assign(query, { milestoneId:new Types.ObjectId(milestoneId)});
    } else if (type === 'fixed' && deliverablesId) {
      Object.assign(query, { deliverablesId:new Types.ObjectId(deliverablesId)});
    }

    console.log(query)

    const existingMeeting = await this.model.findOne(query);

    console.log(existingMeeting)
    return !!existingMeeting;
  }

  async findAllForFreelancer(
    freelancerContractIds: string[],
    query: FreelancerMeetingQueryParamsDTO,
  ): Promise<IMeeting[]> {
    const filter: Record<string, unknown> = {
      contractId: { $in: freelancerContractIds.map((id) => new Types.ObjectId(id)) },
    };

    if (query.status) {
      filter.status = query.status;
    }

    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const meetings = await this.model
      .find(filter)
      .sort({ scheduledAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return meetings;
  }

  async countForFreelancer(
    freelancerContractIds: string[],
    query: FreelancerMeetingQueryParamsDTO,
  ): Promise<number> {
    const filter: Record<string, unknown> = {
      contractId: { $in: freelancerContractIds.map((id) => new Types.ObjectId(id)) },
    };

    if (query.status) {
      filter.status = query.status;
    }

    return await this.model.countDocuments(filter);
  }

  async findDetailByIdForFreelancer(meetingId: string, freelancerContractIds: string[]): Promise<IMeeting | null> {
    const meeting = await this.model.findOne({
      _id: new Types.ObjectId(meetingId),
      contractId: { $in: freelancerContractIds.map((id) => new Types.ObjectId(id)) },
    }).exec();

    return meeting;
  }

  async acceptMeeting(meetingId: string): Promise<IMeeting | null> {
    const meeting = await this.model.findByIdAndUpdate(
      meetingId,
      { status: 'accepted' },
      { new: true },
    ).exec();

    return meeting;
  }

  async requestReschedule(meetingId: string, proposedTime: Date): Promise<IMeeting | null> {
    const meeting = await this.model.findByIdAndUpdate(
      meetingId,
      {
        status: 'reschedule_requested',
        rescheduleRequestedBy: 'freelancer',
        rescheduleProposedTime: proposedTime,
      },
      { new: true },
    ).exec();

    return meeting;
  }
}
