import mongoose, { Model, Document, Schema } from 'mongoose';
import { ISkill } from './interfaces/ISkillModel.js';

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    specialities: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'speciality',
      required: true,
    },
    status: {
      type: String,
      enum: ['list', 'unlist'],
      default: 'list',
    },
  },
  { timestamps: true },
);

export const skillModel: Model<ISkill> = mongoose.model<ISkill>('skill', skillSchema);
