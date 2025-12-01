import { Document, Types } from 'mongoose';

export type EscrowStatus = 'held' | 'released' | 'refunded';

export interface IEscrow extends Document {
  escrowId: string;
  contractId: Types.ObjectId;
  paymentId: Types.ObjectId;
  
  clientId: Types.ObjectId;
  freelancerId: Types.ObjectId;
  
  amount: number;
  amountBaseUSD?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  conversionRate?: number;
  
  status: EscrowStatus;
  heldAt: Date;
  releasedAt?: Date;
  refundedAt?: Date;
  
  milestoneId?: Types.ObjectId;
  description: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}
