export type PaymentType = "fixed" | "fixed_with_milestones" | "hourly";
export type CommunicationMethod = "chat" | "video_call" | "email" | "mixed";
export type ReportingFrequency = "daily" | "weekly";
export type ReportingFormat = "text_with_attachments" | "text_only" | "video";
export type Currency = "USD" | "EUR" | "GBP" | "INR";

export interface MilestonePayload {
  title: string;
  amount: number; // numeric after validation
  expected_delivery: string; // ISO date
}

export interface ReferenceFilePayload {
  file_name: string;
  file_url: string; // presigned or blob for now
}

export interface ReferenceLinkPayload {
  description: string;
  link: string;
}

export interface OfferPayload {
  freelancerId: string; // dummy for now
  jobId: string; // dummy for now
  proposalId: string; // dummy for now
  title: string;
  description: string;
  payment_type: PaymentType;
  budget?: number; // required if fixed/fixed_with_milestones
  currency: Currency;
  hourly_rate?: number; // required if hourly
  estimated_hours_per_week?: number;
  milestones?: MilestonePayload[]; // required if fixed_with_milestones
  expected_start_date: string;
  expected_end_date: string;
  communication: {
    preferred_method: CommunicationMethod;
    meeting_schedule: string; // derived human readable schedule
    timezone: string;
  };
  reporting: {
    frequency: ReportingFrequency;
    due_time: string; // derived phrase (daily at X / every Monday at Y)
    format: ReportingFormat;
  };
  reference_files: ReferenceFilePayload[];
  reference_links: ReferenceLinkPayload[];
  expires_at: string; // ISO datetime
  status: "pending" | "accepted" | "rejected" | "withdrawn";
}

export interface OfferFieldErrors {
  [key: string]: string; // e.g., 'title': 'Required', 'milestones.0.amount': '...' etc.
}
