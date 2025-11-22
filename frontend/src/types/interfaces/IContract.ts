export interface ContractMilestone {
  milestoneId: string;
  title: string;
  amount: number;
  expectedDelivery: string; // ISO date
  status: 'pending' | 'funded' | 'submitted' | 'approved' | 'paid';
}

export type ContractStatus = 'pending_funding' | 'active' | 'completed' | 'cancelled' | 'refunded';

export interface IContract {
  contractId: string;
  offerId?: string;
  clientId: string;
  freelancerId: string;
  jobId?: string;
  title: string;
  description: string;
  paymentType: 'fixed' | 'fixed_with_milestones' | 'hourly';
  budget?: number;
  currency: string;
  milestones?: ContractMilestone[];
  expectedStartDate?: string; // ISO
  expectedEndDate?: string; // ISO
  status: ContractStatus;
  fundedAmount: number;
  totalPaid: number;
  balance: number;
  createdAt?: string;
}
