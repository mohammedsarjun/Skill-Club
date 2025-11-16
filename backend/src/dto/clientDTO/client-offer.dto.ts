export interface ClientOfferRequestDTO {
  freelancerId: string;
  proposalId?: string;
  jobId?: string;
  offerType: 'direct' | 'proposal';
  title: string;
  description: string;
  payment_type: 'fixed' | 'fixed_with_milestones' | 'hourly';
  budget?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  hourly_rate?: number;
  estimated_hours_per_week?: number;
  milestones?: {
    title: string;
    amount: number;
    expected_delivery: string;
  }[];
  expected_start_date: string;
  expected_end_date: string;
  communication: {
    preferred_method: 'chat' | 'video_call' | 'email' | 'mixed';
    meeting_frequency?: 'daily' | 'weekly' | 'monthly';
    meeting_day_of_week?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    meeting_day_of_month?: number;
    meeting_time_utc?: string; // HH:mm
  };
  reporting: {
    frequency: 'daily' | 'weekly' | 'monthly';
    due_time_utc: string; // HH:mm
    due_day_of_week?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    due_day_of_month?: number;
    format: 'text_with_attachments' | 'text_only' | 'video';
  };
  reference_files: { file_name: string; file_url: string }[];
  reference_links: { description: string; link: string }[];
  expires_at: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
}

export interface ClientOfferResponseDTO {
  offerId: string;
  freelancerId: string;
  proposalId?: string;
  jobId?: string;
  status: string;
  title: string;
  description: string;
  paymentType: string;
  budget?: number;
  hourlyRate?: number;
  milestones?: {
    title: string;
    amount: number;
    expectedDelivery: Date;
  }[];
  expectedStartDate: Date;
  expectedEndDate: Date;
  expiresAt: Date;
  createdAt: Date;
}
