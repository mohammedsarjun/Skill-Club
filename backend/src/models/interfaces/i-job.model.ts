import { Document, Types } from 'mongoose';


export interface JobData {
  title: string;
  description: string;
  category: string;
  specialities: string[]; // 1–3 items
  skills: string[]; // 1–10 items
  rateType: 'hourly' | 'fixed';

  // Rates
  hourlyRate?: {
    min: number;
    max?: number;
  };
  fixedRate?: {
    min: number;
    max?: number;
  };

  clientId: Types.ObjectId;
  slots: number; // default 1
  applyUntil?: Date;

  status: 
    | 'pending_verification'
    | 'open'
    | 'partially_filled'
    | 'in_progress'
    | 'closed'
    | 'archived'
    | 'rejected';


  verifiedBy?: Types.ObjectId; 
  rejectedReason?: string; 

  createdAt: Date;
  updatedAt: Date;
}


export interface IJob extends JobData, Document {}
