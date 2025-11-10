import { Document, Types } from 'mongoose';

export interface ProposalDetail {
  freelancerId: Types.ObjectId;       
  jobId: Types.ObjectId;             
  hourlyRate?: number;              
  availableHoursPerWeek?: number;    
  proposedBudget?: number;           
  deadline?: Date;  
  status:"pending_verification"|"accepted"|"rejected"               
  coverLetter: string;               
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProposal extends ProposalDetail, Document {}