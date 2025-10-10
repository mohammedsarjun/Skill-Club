import mongoose, { Schema } from "mongoose";
const portfolioSchema = new Schema({
    freelancerId: { type: Schema.Types.ObjectId, ref: "freelancer", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    technologies: { type: [String], default: [] },
    role: { type: String, required: true, trim: true },
    projectUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    images: { type: [String], default: [] },
    video: { type: String, default: "" }
}, { timestamps: true });
export const portfolioModel = mongoose.model("portfolio", portfolioSchema);
//# sourceMappingURL=portfolioModel.js.map