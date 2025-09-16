// ------------------- Interfaces -------------------
import mongoose, { Document, Schema } from "mongoose";
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

export interface IFreelancerProfile {
  workField: string;
  skills: string[];
  professionalRole: string;
  experience: string;
  education: string;
  languages: ILanguage[];
  bio: string;
  hourlyRate: number;
  weeklyHours: number;
  portfolio: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address: IAddress;
  dob: Date;
  isVerified: boolean;
  roles: string[];
  freelancerProfile: IFreelancerProfile;
  createdAt: Date;
  updatedAt: Date;
}