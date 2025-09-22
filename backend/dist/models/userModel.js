import mongoose, { Schema } from "mongoose";
// ------------------- Schemas -------------------
const addressSchema = new Schema({
    country: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
});
const languageSchema = new Schema({
    name: String,
    proficiency: String,
});
const experienceSchema = new Schema({
    company: String,
    location: String,
    country: String,
    isCurrentRole: Boolean,
    startMonth: Number,
    startYear: Number,
    endMonth: Number,
    endYear: Number
});
const educationSchema = new Schema({
    school: String,
    degree: String,
    fieldOfStudy: String,
    isCurrentEducation: Boolean,
    startYear: Number,
    endYear: Number,
    description: String
});
const freelancerProfileSchema = new Schema({
    logo: String,
    workCategory: String,
    specialties: [String],
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
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    address: addressSchema,
    dob: Date,
    isVerified: { type: Boolean, default: false },
    roles: { type: [String] },
    activeRole: String,
    freelancerProfile: freelancerProfileSchema,
}, { timestamps: true });
// ------------------- Model -------------------
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=userModel.js.map