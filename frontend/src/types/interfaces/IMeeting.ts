export interface MeetingProposalRequest {
  scheduledAt: string;
  durationMinutes: number;
  meetingLink?: string;
  type: 'milestone' | 'fixed';
  milestoneId?: string;
  deliverableId?: string;
}

export interface MeetingProposalResponse {
  success: boolean;
  data: {
    meetingId: string;
    contractId: string;
    scheduledAt: string;
    durationMinutes: number;
    meetingLink?: string;
    type: 'milestone' | 'fixed';
    status: string;
    createdAt: string;
  };
  message: string;
}
