import mongoose, { Schema } from 'mongoose';
const specialitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
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
export const specialityModel = mongoose.model('speciality', specialitySchema);
//# sourceMappingURL=specialityModel.js.map
