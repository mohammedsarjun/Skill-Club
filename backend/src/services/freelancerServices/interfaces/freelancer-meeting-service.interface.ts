import {
  FreelancerMeetingListResultDTO,
  FreelancerMeetingQueryParamsDTO,
  FreelancerMeetingDetailDTO,
  AcceptMeetingDTO,
  RequestRescheduleDTO,
} from '../../../dto/freelancerDTO/freelancer-meeting.dto';

export interface IFreelancerMeetingService {
  getAllMeetings(
    freelancerId: string,
    query: FreelancerMeetingQueryParamsDTO,
  ): Promise<FreelancerMeetingListResultDTO>;
  getMeetingDetail(freelancerId: string, meetingId: string): Promise<FreelancerMeetingDetailDTO>;
  acceptMeeting(freelancerId: string, data: AcceptMeetingDTO): Promise<void>;
  requestReschedule(freelancerId: string, data: RequestRescheduleDTO): Promise<void>;
}
