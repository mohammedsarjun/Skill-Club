import mongoose, { Document } from "mongoose";
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
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=userModel.d.ts.map