import { Document, Types } from 'mongoose';
export interface IUserActionVerification extends Document {
  userId: Types.ObjectId;
  actionType: 'emailChange' | 'passwordReset' | 'phoneUpdate' | 'twoFASetup';
  actionData: Record<string, any>;
  passwordVerified: boolean;
  otpSent: boolean;
  otpVerified: boolean;
  status: 'pending' | 'completed' | 'expired' | 'failed';
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
//# sourceMappingURL=IActionVerificationModel.d.ts.map
