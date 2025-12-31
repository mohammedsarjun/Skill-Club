export interface IFreelancerMeetingListItem {
  meetingId: string;
  contractId: string;
  contractTitle: string;
  type: 'recurring' | 'milestone' | 'fixed';
  scheduledAt: string;
  durationMinutes: number;
  meetingLink?: string;
  status: 'proposed' | 'accepted' | 'completed' | 'missed' | 'partial_missed' | 'reschedule_requested';
  client?: {
    clientId: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    logo?: string;
  };
  milestoneId?: string;
  milestoneTitle?: string;
  deliverableId?: string;
  createdAt: string;
}

export interface IFreelancerMeetingListResult {
  items: IFreelancerMeetingListItem[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface IFreelancerMeetingQueryParams {
  page?: number;
  limit?: number;
  status?: 'proposed' | 'accepted' | 'completed' | 'missed' | 'partial_missed' | 'reschedule_requested';
}

export interface IFreelancerMeetingDetail {
  meetingId: string;
  contractId: string;
  contractTitle: string;
  type: 'recurring' | 'milestone' | 'fixed';
  scheduledAt: string;
  durationMinutes: number;
  meetingLink?: string;
  status: 'proposed' | 'accepted' | 'completed' | 'missed' | 'partial_missed' | 'reschedule_requested';
  client?: {
    clientId: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    logo?: string;
  };
  milestoneId?: string;
  milestoneTitle?: string;
  milestoneAmount?: number;
  deliverableId?: string;
  deliverableVersion?: number;
  rescheduleRequestedBy?: string;
  rescheduleProposedTime?: string;
  completedByClient: boolean;
  notes?: {
    clientNotes?: string;
    freelancerNotes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAcceptMeetingRequest {
  meetingId: string;
}

export interface IRequestRescheduleRequest {
  meetingId: string;
  proposedTime: string;
}
