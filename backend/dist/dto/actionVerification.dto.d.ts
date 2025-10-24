import { Types } from 'mongoose';
export interface CreateActionVerificationDto {
  userId: Types.ObjectId;
  actionType: 'emailChange' | 'passwordReset' | 'phoneUpdate';
  actionData: Record<string, any>;
}
//# sourceMappingURL=actionVerification.dto.d.ts.map
