// ------------------- Interfaces -------------------
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAddress {
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ILanguage {
  name: string;
  proficiency: string;
}

export interface IExperience {
  title: string;
  company: string;
  location: string;
  country: string;
  isCurrentRole: boolean;
  startMonth: string;
  startYear: number;
  endMonth?: string;
  endYear?: number;
}

export interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
  description: string;
}

export interface IFreelancerProfile {
  logo: string|undefined;
  workCategory: string;
  specialties: string[];
  skills: string[];
  professionalRole: string;
  experiences: IExperience[];
  education: IEducation[];
  languages: ILanguage[];
  bio: string;
  hourlyRate: number;
  portfolio: [];
}

// ------------------- Client Profile -------------------
export interface IClientProfile {
  companyName: string;
  logo?: string|undefined;
  description?: string;
  website?: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  googleId?: string;
  email: string;
  phone?: number;
  password?: string;
  avatar?: string;
  address: IAddress;
  dob: Date;
  isVerified: boolean;
  isFreelancerBlocked: boolean;
  isClientBlocked:boolean
  isOnboardingCompleted: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  roles: string[];
  activeRole: string;
  freelancerProfile: IFreelancerProfile;
  clientProfile: IClientProfile; // ✅ added here
  provider: "local" | "google";
  createdAt: Date;
  updatedAt: Date;
}
