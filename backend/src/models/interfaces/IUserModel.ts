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

export interface IExperience{
  title:string,
  company:string,
  location:string,
  country:string,
  isCurrentRole:boolean,
  startMonth:number,
  startYear:number,
  endMonth?:number,
  endYear?:number
}

export interface IEducation{
  school:string,
  degree:string,
  fieldOfStudy:string,
  isCurrentEducation:boolean
  startYear:number,
  endYear?:number,
  description:string
}

export interface IFreelancerProfile {
  logo:string
  workCategory: string;
  specialties:string[];
  skills: string[];
  professionalRole: string;
  experience: IExperience[];
  education: IEducation[];
  languages: ILanguage[];
  bio: string;
  hourlyRate: number;
  weeklyHours: number;
  portfolio: string;

}

export interface IUser extends Document {
  _id:Types.ObjectId
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  address: IAddress;
  dob: Date;
  isVerified: boolean;
  roles: string[];
  activeRole:string
  freelancerProfile: IFreelancerProfile;
  createdAt: Date;
  updatedAt: Date;
}