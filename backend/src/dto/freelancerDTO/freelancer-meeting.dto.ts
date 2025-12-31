export interface FreelancerMeetingListItemDTO {
  meetingId: string;
  contractId: string;
  contractTitle: string;
  type: 'recurring' | 'milestone' | 'fixed';
  scheduledAt: Date;
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
  createdAt: Date;
}

export interface FreelancerMeetingListResultDTO {
  items: FreelancerMeetingListItemDTO[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface FreelancerMeetingQueryParamsDTO {
  page?: number;
  limit?: number;
  status?: 'proposed' | 'accepted' | 'completed' | 'missed' | 'partial_missed' | 'reschedule_requested';
}

export interface FreelancerMeetingDetailDTO {
  meetingId: string;
  contractId: string;
  contractTitle: string;
  type: 'recurring' | 'milestone' | 'fixed';
  scheduledAt: Date;
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
  rescheduleProposedTime?: Date;
  completedByClient: boolean;
  notes?: {
    clientNotes?: string;
    freelancerNotes?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AcceptMeetingDTO {
  meetingId: string;
}

export interface RequestRescheduleDTO {
  meetingId: string;
  proposedTime: Date;
}
