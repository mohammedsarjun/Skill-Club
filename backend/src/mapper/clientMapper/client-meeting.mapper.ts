import { IMeeting } from '../../models/interfaces/meeting.model.interface';
import { ClientMeetingProposalResponseDTO } from '../../dto/clientDTO/client-meeting.dto';

function docIdToString(id: unknown): string | undefined {
  if (!id) return undefined;
  if (typeof id === 'string') return id;
  if (
    typeof id === 'object' &&
    id !== null &&
    'toString' in id &&
    typeof (id as { toString: unknown }).toString === 'function'
  ) {
    return (id as { toString(): string }).toString();
  }
  return undefined;
}

export const mapMeetingToClientMeetingProposalResponseDTO = (meeting: IMeeting): ClientMeetingProposalResponseDTO => {
  const rawObj = meeting as unknown as Record<string, unknown>;
  const rawId = docIdToString(rawObj._id) || docIdToString(rawObj.id) || '';

  return {
    meetingId: rawId,
    contractId: meeting.contractId.toString(),
    scheduledAt: meeting.scheduledAt,
    durationMinutes: meeting.durationMinutes,
    meetingLink: meeting.meetingLink,
    type: meeting.type as 'milestone' | 'fixed',
    status: meeting.status,
    createdAt: meeting.createdAt,
  };
};
