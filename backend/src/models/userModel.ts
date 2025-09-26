import mongoose, { Document, Schema } from "mongoose";
import { IUser, IAddress, ILanguage, IFreelancerProfile, IExperience, IEducation } from "./interfaces/IUserModel.js";


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

const experienceSchema = new Schema<IExperience>({
  company: String,
  location: String,
  country: String,
  isCurrentRole: Boolean,
  startMonth: String,
  startYear: Number,
  endMonth: String,
  endYear: Number
})

const educationSchema = new Schema<IEducation>({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startYear: Number,
  endYear: Number,
  description: String
})

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

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    googleId: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: false },
    avatar: { type: String },
    address: addressSchema,
    dob: Date,
    isVerified: { type: Boolean, default: false },
    isBlocked:{type:Boolean,default:false},
    roles: { type: [String] },
    activeRole: String,
    freelancerProfile: freelancerProfileSchema,
    isOnboardingCompleted:{type:Boolean,default:false},
    isFreelancerBoardingCompleted:{type:Boolean,default:false},
    resetPasswordToken:{type:String,default:undefined},
    resetPasswordExpires:{type:Date,default:undefined},
    provider: { type: String, enum: ["local", "google"], default: "local" },
  },
  { timestamps: true }
);

// ------------------- Model -------------------
export const User = mongoose.model<IUser>("User", userSchema);

