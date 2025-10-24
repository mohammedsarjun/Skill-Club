import mongoose, { Schema } from 'mongoose';
const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  purpose: {
    type: String,
    enum: ['signup', 'forgotPassword', 'changeEmail'], // extend later
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 70 * 1000),
    index: { expires: '70s' },
  },
});
export const otpModel = mongoose.model('otp', otpSchema);
//# sourceMappingURL=otpModel.js.map
