import mongoose, { Schema } from 'mongoose';
const skillSchema = new Schema(
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
export const skillModel = mongoose.model('skill', skillSchema);
//# sourceMappingURL=skillModel.js.map
