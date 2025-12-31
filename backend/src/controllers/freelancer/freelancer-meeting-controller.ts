import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IFreelancerMeetingController } from './interfaces/freelancer-meeting-controller.interface';
import { IFreelancerMeetingService } from '../../services/freelancerServices/interfaces/freelancer-meeting-service.interface';
import { HttpStatus } from '../../enums/http-status.enum';
import {
  FreelancerMeetingQueryParamsDTO,
  AcceptMeetingDTO,
  RequestRescheduleDTO,
} from '../../dto/freelancerDTO/freelancer-meeting.dto';

@injectable()
export class FreelancerMeetingController implements IFreelancerMeetingController {
  private _freelancerMeetingService: IFreelancerMeetingService;

  constructor(
    @inject('IFreelancerMeetingService') freelancerMeetingService: IFreelancerMeetingService,
  ) {
    this._freelancerMeetingService = freelancerMeetingService;
  }

  async getMeetings(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { page, limit, status } = req.query;

    const query: FreelancerMeetingQueryParamsDTO = {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      status: status as FreelancerMeetingQueryParamsDTO['status'],
    };

    const result = await this._freelancerMeetingService.getAllMeetings(freelancerId, query);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Meetings fetched successfully',
      data: result,
    });
  }

  async getMeetingDetail(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { meetingId } = req.params;

    const result = await this._freelancerMeetingService.getMeetingDetail(freelancerId, meetingId);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Meeting detail fetched successfully',
      data: result,
    });
  }

  async acceptMeeting(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { meetingId } = req.body;

    const data: AcceptMeetingDTO = { meetingId };

    await this._freelancerMeetingService.acceptMeeting(freelancerId, data);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Meeting accepted successfully',
    });
  }

  async requestReschedule(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { meetingId, proposedTime } = req.body;

    const data: RequestRescheduleDTO = {
      meetingId,
      proposedTime: new Date(proposedTime),
    };

    await this._freelancerMeetingService.requestReschedule(freelancerId, data);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reschedule request sent successfully',
    });
  }
}
