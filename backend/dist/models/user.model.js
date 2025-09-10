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
const freelancerProfileSchema = new Schema({
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
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: addressSchema,
    dob: Date,
    isVerified: { type: Boolean, default: false },
    roles: { type: [String], default: ["user"] },
    freelancerProfile: freelancerProfileSchema,
}, { timestamps: true });
// ------------------- Model -------------------
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map