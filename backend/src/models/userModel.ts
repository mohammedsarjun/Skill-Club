import mongoose, { Schema } from 'mongoose';
import {
  IUser,
  IAddress,
  IFreelancerProfile,
  IExperience,
  IEducation,
} from './interfaces/IUserModel.js';

// ------------------- Schemas -------------------
const addressSchema = new Schema<IAddress>({
  country: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: String,
});

const languageSchema = new Schema({
  name: {
    type: String,
    enum: ['English', 'Tamil', 'Hindi', 'Spanish'], 
    required: true
  },
  proficiency: {
    type: String,
    enum: ['Conversational', 'Fluent'], 
    required: true
  }
});

const experienceSchema = new Schema<IExperience>({
  company: String,
  location: String,
  country: String,
  isCurrentRole: Boolean,
  startMonth: String,
  startYear: Number,
  endMonth: String,
  endYear: Number,
});

const educationSchema = new Schema<IEducation>({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startYear: Number,
  endYear: Number,
  description: String,
});

const freelancerProfileSchema = new Schema<IFreelancerProfile>({
  logo: String,
  workCategory: String,
  specialties: [String],
  skills: [String],
  professionalRole: String,
  experiences: [experienceSchema],
  education: [educationSchema],
  languages: [languageSchema],
  bio: String,
  hourlyRate: Number,
  portfolio: [],
});

// ------------------- Client Profile -------------------
const clientProfileSchema = new Schema({
  companyName: { type: String, required: true },
  logo: String,
  description: String,
  website: String,
  location: String,
});

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    googleId: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: false },
    password: { type: String, required: false },
    avatar: { type: String },
    address: addressSchema,
    dob: Date,
    isVerified: { type: Boolean, default: false },
    isFreelancerBlocked: { type: Boolean, default: false },
    isClientBlocked: { type: Boolean, default: false },
    roles: { type: [String] },
    activeRole: String,
    freelancerProfile: freelancerProfileSchema,
    clientProfile: clientProfileSchema, // ✅ Added here
    isOnboardingCompleted: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: undefined },
    resetPasswordExpires: { type: Date, default: undefined },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
  },
  { timestamps: true },
);

// ------------------- Model -------------------
export const User = mongoose.model<IUser>('User', userSchema);
