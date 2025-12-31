export interface ClientMeetingProposalRequestDTO {
  scheduledAt: string;
  durationMinutes: number;
  meetingLink?: string;
  type: 'milestone' | 'fixed';
  milestoneId?: string;
  deliverableId?: string;
}

export interface ClientMeetingProposalResponseDTO {
  meetingId: string;
  contractId: string;
  scheduledAt: Date;
  durationMinutes: number;
  meetingLink?: string;
  type: 'milestone' | 'fixed';
  status: string;
  createdAt: Date;
}
