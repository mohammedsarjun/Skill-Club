import { IMeeting } from '../../models/interfaces/meeting.model.interface';
import { IContract } from '../../models/interfaces/contract.model.interface';
import { FreelancerMeetingListItemDTO, FreelancerMeetingDetailDTO } from '../../dto/freelancerDTO/freelancer-meeting.dto';
import { IUser } from '../../models/interfaces/user.model.interface';
import { Types } from 'mongoose';

function isPopulatedUser(clientId: Types.ObjectId | IUser): clientId is IUser {
  return clientId && typeof clientId === 'object' && 'firstName' in clientId;
}

export function mapMeetingToFreelancerListItemDTO(
  meeting: IMeeting,
  contract: IContract,
): FreelancerMeetingListItemDTO {
  const milestone = meeting.milestoneId && contract.milestones
    ? contract.milestones.find((m) => m._id?.toString() === meeting.milestoneId?.toString())
    : undefined;

  const clientData = contract.clientId && isPopulatedUser(contract.clientId)
    ? {
        clientId: contract.clientId._id?.toString() || '',
        firstName: contract.clientId.firstName,
        lastName: contract.clientId.lastName,
        companyName: contract.clientId.clientProfile?.companyName,
        logo: contract.clientId.clientProfile?.logo,
      }
    : undefined;

  return {
    meetingId: meeting._id?.toString() || '',
    contractId: contract._id?.toString() || '',
    contractTitle: contract.title,
    type: meeting.type,
    scheduledAt: meeting.scheduledAt,
    durationMinutes: meeting.durationMinutes,
    meetingLink: meeting.meetingLink,
    status: meeting.status,
    client: clientData,
    milestoneId: meeting.milestoneId?.toString(),
    milestoneTitle: milestone?.title,
    deliverableId: meeting.deliverablesId?.toString(),
    createdAt: meeting.createdAt || new Date(),
  };
}

export function mapMeetingToFreelancerDetailDTO(
  meeting: IMeeting,
  contract: IContract,
): FreelancerMeetingDetailDTO {
  const milestone = meeting.milestoneId && contract.milestones
    ? contract.milestones.find((m) => m._id?.toString() === meeting.milestoneId?.toString())
    : undefined;

  const deliverable = meeting.deliverablesId && contract.deliverables
    ? contract.deliverables.find((d) => d._id?.toString() === meeting.deliverablesId?.toString())
    : undefined;

  const clientData = contract.clientId && isPopulatedUser(contract.clientId)
    ? {
        clientId: contract.clientId._id?.toString() || '',
        firstName: contract.clientId.firstName,
        lastName: contract.clientId.lastName,
        companyName: contract.clientId.clientProfile?.companyName,
        logo: contract.clientId.clientProfile?.logo,
      }
    : undefined;

  return {
    meetingId: meeting._id?.toString() || '',
    contractId: contract._id?.toString() || '',
    contractTitle: contract.title,
    type: meeting.type,
    scheduledAt: meeting.scheduledAt,
    durationMinutes: meeting.durationMinutes,
    meetingLink: meeting.meetingLink,
    status: meeting.status,
    client: clientData,
    milestoneId: meeting.milestoneId?.toString(),
    milestoneTitle: milestone?.title,
    milestoneAmount: milestone?.amount,
    deliverableId: meeting.deliverablesId?.toString(),
    deliverableVersion: deliverable?.version,
    rescheduleRequestedBy: meeting.rescheduleRequestedBy ?? undefined,
    rescheduleProposedTime: meeting.rescheduleProposedTime ?? undefined,
    completedByClient: meeting.completedByClient,
    notes: meeting.notes,
    createdAt: meeting.createdAt || new Date(),
    updatedAt: meeting.updatedAt || new Date(),
  };
}
