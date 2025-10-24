import mongoose, { Model, Schema } from 'mongoose';
import { IJob } from './interfaces/i-job.model';

const jobSchema: Schema<IJob> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    specialities: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length >= 1 && val.length <= 3,
        message: 'A job must have between 1 and 3 specialities',
      },
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length >= 1 && val.length <= 10,
        message: 'A job must have between 1 and 10 skills',
      },
    },
    rateType: {
      type: String,
      enum: ['hourly', 'fixed'],
      required: true,
    },
    hourlyRate: {
      min: { type: Number, required: function(this: IJob) { return this.rateType === 'hourly'; } },
      max: { type: Number, required: function(this: IJob) { return this.rateType === 'hourly'; } },
    },
    fixedRate: {
      min: { type: Number, required: function(this: IJob) { return this.rateType === 'fixed'; } },
      max: { type: Number, required: function(this: IJob) { return this.rateType === 'fixed'; } },
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slots: {
      type: Number,
      default: 1,
      min: 1,
    },
    applyUntil: {
      type: Date,
    },
    status: {
      type: String,
      enum: [
        'pending_verification',
        'open',
        'partially_filled',
        'in_progress',
        'closed',
        'archived',
        'rejected',
      ],
      default: 'pending_verification',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    rejectedReason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const jobModel: Model<IJob> = mongoose.model<IJob>('Job', jobSchema);
