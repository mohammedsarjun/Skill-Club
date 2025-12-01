import { Document, Types } from 'mongoose';

export type TransactionType = 'debit' | 'credit';
export type TransactionPurpose = 
  | 'contract_funding' 
  | 'milestone_funding'
  | 'milestone_payment' 
  | 'hourly_payment' 
  | 'hourly_advance'
  | 'refund' 
  | 'withdrawal';

export interface ITransaction extends Document {
  transactionId: string;
  paymentId?: Types.ObjectId;
  contractId: Types.ObjectId;
  
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
  
  type: TransactionType;
  purpose: TransactionPurpose;
  amount: number;
  amountBaseUSD?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  conversionRate?: number;
  
  description: string;
  metadata?: Record<string, unknown>;
  
  createdAt?: Date;
  updatedAt?: Date;
}
