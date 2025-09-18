import mongoose, { Document, Schema } from "mongoose";
import { IUser,IAddress,ILanguage,IFreelancerProfile, IExperience, IEducation } from "./interfaces/IUserModel.js";


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
  company:String,
  location:String,
  country:String,
  isCurrentRole:Boolean,
  startMonth:Number,
  startYear:Number,
  endMonth:Number,
  endYear:Number
})

const educationSchema = new Schema<IEducation>({
  school:String,
  degree:String,
  fieldOfStudy:String,
  isCurrentEducation:Boolean,
  startYear:Number,
  endYear:Number,
  description:String
})

const freelancerProfileSchema = new Schema<IFreelancerProfile>({
  workCategory: String,
  specialties:[String],
  skills: [String],
  professionalRole: String,
  experience: [experienceSchema],
  education: [educationSchema],
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

