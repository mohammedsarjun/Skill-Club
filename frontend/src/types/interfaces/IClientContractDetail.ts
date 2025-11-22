export interface IClientContractDetail {
  contractId: string;
  offerId: string;
  offerType?: 'direct' | 'proposal';
  jobId?: string;
  jobTitle?: string;
  proposalId?: string;
  
  freelancer?: {
    freelancerId: string;
    firstName?: string;
    lastName?: string;
    logo?: string;
    country?: string;
    rating?: number;
  };

  paymentType: 'fixed' | 'fixed_with_milestones' | 'hourly';
  budget?: number;
  budgetBaseUSD?: number;
  hourlyRate?: number;
  hourlyRateBaseUSD?: number;
  conversionRate?: number;
  estimatedHoursPerWeek?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';

  milestones?: {
    milestoneId: string;
    title: string;
    amount: number;
    amountBaseUSD?: number;
    expectedDelivery: string;
    status: 'pending' | 'funded' | 'submitted' | 'approved' | 'paid';
    submittedAt?: string;
    approvedAt?: string;
  }[];

  title: string;
  description: string;
  expectedStartDate: string;
  expectedEndDate: string;
  referenceFiles: { fileName: string; fileUrl: string }[];
  referenceLinks: { description: string; link: string }[];
  
  communication?: {
    preferredMethod: 'chat' | 'video_call' | 'email' | 'mixed';
    meetingFrequency?: 'daily' | 'weekly' | 'monthly';
    meetingDayOfWeek?: string;
    meetingDayOfMonth?: number;
    meetingTimeUtc?: string;
  };
  
  reporting?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    dueTimeUtc: string;
    dueDayOfWeek?: string;
    dueDayOfMonth?: number;
    format: 'text_with_attachments' | 'text_only' | 'video';
  };

  status: 'pending_funding' | 'active' | 'completed' | 'cancelled' | 'refunded';
  fundedAmount: number;
  totalPaid: number;
  balance: number;
  
  createdAt?: string;
  updatedAt?: string;
}
