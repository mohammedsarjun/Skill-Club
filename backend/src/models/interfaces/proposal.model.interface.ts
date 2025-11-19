import { Document, Types } from 'mongoose';

export interface ProposalDetail {
  freelancerId: Types.ObjectId;
  jobId: Types.ObjectId;
  hourlyRate?: number;
  availableHoursPerWeek?: number;
  proposedBudget?: number;
  deadline?: Date;
  status: 'pending_verification' | 'rejected' | 'offer_sent';
  coverLetter: string;
  currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  amountBaseUSD?: number;
  conversionRate?: number; // USD per 1 unit of `currency`
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProposal extends ProposalDetail, Document {}

export interface ProposalDetailWithFreelancerDetail extends IProposal {
  freelancer: {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    freelancerProfile: {
      logo: string;
    };
    address: {
      country: string;
    };
  };
}

export interface ProposalDetailWithJobDetail extends IProposal {
  jobDetail: {
    _id: Types.ObjectId;
    title: string;
    description: string;
    clientId: Types.ObjectId;
  };
}
