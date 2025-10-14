import { model, Schema } from 'mongoose';
const userActionVerificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: {
        type: String,
        enum: ['emailChange', 'passwordReset', 'phoneUpdate', 'twoFASetup'],
        required: true,
    },
    actionData: { type: Schema.Types.Mixed, required: true },
    passwordVerified: { type: Boolean, default: false },
    otpSent: { type: Boolean, default: false },
    otpVerified: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['pending', 'completed', 'expired', 'failed'],
        default: 'pending',
    },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const UserActionVerificationModel = model('UserActionVerification', userActionVerificationSchema);
//# sourceMappingURL=actionVerificationModel.js.map