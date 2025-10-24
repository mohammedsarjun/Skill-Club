"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const addressSchema = new mongoose_1.Schema({
    country: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
});
const languageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: ['English', 'Tamil', 'Hindi', 'Spanish'],
        required: true,
    },
    proficiency: {
        type: String,
        enum: ['Conversational', 'Fluent'],
        required: true,
    },
});
const experienceSchema = new mongoose_1.Schema({
    title: String,
    company: String,
    location: String,
    country: String,
    isCurrentRole: Boolean,
    startMonth: String,
    startYear: Number,
    endMonth: String,
    endYear: Number,
});
const educationSchema = new mongoose_1.Schema({
    school: String,
    degree: String,
    fieldOfStudy: String,
    startYear: Number,
    endYear: Number,
});
const freelancerProfileSchema = new mongoose_1.Schema({
    logo: String,
    workCategory: { type: mongoose_1.Schema.Types.ObjectId, ref: 'category' },
    specialties: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'speciality' }],
    skills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'skill' }],
    professionalRole: String,
    experiences: [experienceSchema],
    education: [educationSchema],
    languages: [languageSchema],
    bio: String,
    hourlyRate: Number,
    portfolio: [],
});
const clientProfileSchema = new mongoose_1.Schema({
    companyName: { type: String, required: true },
    logo: String,
    description: String,
    website: String,
    location: String,
});
const userSchema = new mongoose_1.Schema({
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
    clientProfile: clientProfileSchema,
    isOnboardingCompleted: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: undefined },
    resetPasswordExpires: { type: Date, default: undefined },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map