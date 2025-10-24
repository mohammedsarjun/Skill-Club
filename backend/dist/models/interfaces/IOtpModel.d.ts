import { Document } from 'mongoose';
export interface IOtp extends Document {
  email: string;
  otp: string;
  purpose: 'signup' | 'forgotPassword';
  createdAt: Date;
  expiresAt: Date;
}
//# sourceMappingURL=IOtpModel.d.ts.map
