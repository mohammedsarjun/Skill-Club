import mongoose, { Model, Schema, Types } from 'mongoose';
import { ISkill } from './interfaces/i-skill.model';

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    specialities: [
      {
        type: Types.ObjectId,
        ref: 'speciality',
      },
    ],
    status: {
      type: String,
      enum: ['list', 'unlist'],
      default: 'list',
    },
  },
  { timestamps: true },
);

export const skillModel: Model<ISkill> = mongoose.model<ISkill>('skill', skillSchema);
