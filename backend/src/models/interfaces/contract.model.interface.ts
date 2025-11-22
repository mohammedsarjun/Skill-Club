import { Document, Types } from 'mongoose';

export type ContractStatus = 'pending_funding' | 'active' | 'completed' | 'cancelled' | 'refunded';

export type MilestoneStatus = 'pending' | 'funded' | 'submitted' | 'approved' | 'paid';

export interface ContractMilestone {
  milestoneId: Types.ObjectId;
  title: string;
  amount: number;
  amountBaseUSD?: number;
  expectedDelivery: Date;
  status: MilestoneStatus;
  submittedAt?: Date;
  approvedAt?: Date;
}

export interface ContractDeliverable {
  submittedBy: Types.ObjectId;
  files: { fileName: string; fileUrl: string }[];
  message?: string;
  status: 'submitted' | 'approved' | 'changes_requested';
  submittedAt: Date;
  approvedAt?: Date;
}

export interface HourLog {
  date: Date;
  hours: number;
}

export interface ContractTimesheet {
  weekStart: Date;
  weekEnd: Date;
  totalHours: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'paid';
  hoursLogged: HourLog[];
}

export interface ContractCommunication {
  preferredMethod: 'chat' | 'video_call' | 'email' | 'mixed';
  meetingFrequency?: 'daily' | 'weekly' | 'monthly';
  meetingDayOfWeek?:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';
  meetingDayOfMonth?: number; // 1..31 when monthly
  meetingTimeUtc?: string; // HH:mm
}

export interface ContractReporting {
  frequency: 'daily' | 'weekly' | 'monthly';
  dueTimeUtc: string; // HH:mm
  dueDayOfWeek?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  dueDayOfMonth?: number; // 1..31 when monthly
  format: 'text_with_attachments' | 'text_only' | 'video';
}

export interface IContract extends Document {
  contractId: string;

  // Link to offer
  offerId: Types.ObjectId;

  // Parties
  clientId: Types.ObjectId;
  freelancerId: Types.ObjectId;

  // Optional references
  jobId?: Types.ObjectId;
  proposalId?: Types.ObjectId;

  // Payment info
  paymentType: 'fixed' | 'fixed_with_milestones' | 'hourly';
  budget?: number;
  budgetBaseUSD?: number;
  hourlyRate?: number;
  hourlyRateBaseUSD?: number;
  conversionRate?: number;
  estimatedHoursPerWeek?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';

  // Milestones
  milestones?: ContractMilestone[];

  // Hourly tracking
  timesheets?: ContractTimesheet[];

  // Deliverables
  deliverables?: ContractDeliverable[];

  // Project details
  title: string;
  description: string;
  expectedStartDate: Date;
  expectedEndDate: Date;
  referenceFiles: { fileName: string; fileUrl: string }[];
  referenceLinks: { description: string; link: string }[];
  communication: ContractCommunication;
  reporting: ContractReporting;

  // Contract lifecycle
  status: ContractStatus;
  fundedAmount: number;
  totalPaid: number;
  balance: number;

  createdAt?: Date;
  updatedAt?: Date;
}
