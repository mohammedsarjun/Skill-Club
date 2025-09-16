import mongoose, { Document, Schema } from "mongoose";
import { IUser,IAddress,ILanguage,IFreelancerProfile } from "./interfaces/IUserModel.js";


// ------------------- Schemas -------------------
const addressSchema = new Schema<IAddress>({
  country: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: String,
});

const languageSchema = new Schema<ILanguage>({
  name: String,
  proficiency: String,
});

const freelancerProfileSchema = new Schema<IFreelancerProfile>({
  workField: String,
  skills: [String],
  professionalRole: String,
  experience: String,
  education: String,
  languages: [languageSchema],
  bio: String,
  hourlyRate: Number,
  weeklyHours: Number,
  portfolio: String,
});

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: addressSchema,
    dob: Date,
    isVerified: { type: Boolean, default: false },
    roles: { type: [String] },
    freelancerProfile: freelancerProfileSchema,
  },
  { timestamps: true }
);

// ------------------- Model -------------------
export const User = mongoose.model<IUser>("User", userSchema);

