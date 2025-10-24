"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileSchema = exports.educationSchema = exports.portfolioSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.portfolioSchema = zod_1.default.object({
    title: zod_1.default.string().nonempty('Project title is required'),
    description: zod_1.default.string().nonempty('Description is required'),
    role: zod_1.default.string().nonempty('Role is required'),
    projectUrl: zod_1.default.string().url('Invalid project URL').optional().or(zod_1.default.literal('')),
    githubUrl: zod_1.default.string().url('Invalid GitHub URL').optional().or(zod_1.default.literal('')),
    technologies: zod_1.default.array(zod_1.default.string()),
    images: zod_1.default.array(zod_1.default.instanceof(File).optional()),
    video: zod_1.default.instanceof(File, { message: 'Video is required' }),
});
exports.educationSchema = zod_1.default.object({
    school: zod_1.default.string().min(2, 'School is required'),
    degree: zod_1.default.string().min(2, 'Degree is required'),
    field: zod_1.default.string().min(2, 'Field is required'),
    startYear: zod_1.default.string().min(4, 'Start year is required'),
    endYear: zod_1.default.string().min(4, 'End year is required'),
});
exports.userProfileSchema = zod_1.default.object({
    firstName: zod_1.default
        .string()
        .trim()
        .min(1, 'First name is required')
        .max(50, 'First name must be less than 50 characters'),
    lastName: zod_1.default
        .string()
        .trim()
        .min(1, 'Last name is required')
        .max(50, 'Last name must be less than 50 characters'),
    phone: zod_1.default
        .string()
        .trim()
        .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    dob: zod_1.default
        .string()
        .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid date format',
    })
        .refine((value) => {
        const date = new Date(value);
        const today = new Date();
        return date < today;
    }, { message: 'Date of birth must be in the past' }),
});
//# sourceMappingURL=validations.js.map