import mongoose, { Document, Schema } from "mongoose";

// ------------------- Interfaces -------------------
interface IAddress {
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ILanguage {
  name: string;
  proficiency: string; 
}

interface IFreelancerProfile {
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
  firstname: string;
  lastname: string;
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
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: addressSchema,
    dob: Date,
    isVerified: { type: Boolean, default: false },
    roles: { type: [String], default: ["user"] },
    freelancerProfile: freelancerProfileSchema,
  },
  { timestamps: true }
);

// ------------------- Model -------------------
const User = mongoose.model<IUser>("User", userSchema);
export default User;
