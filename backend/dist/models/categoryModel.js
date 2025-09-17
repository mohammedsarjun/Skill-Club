import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["list", "unlist"],
        default: "list"
    }
}, { timestamps: true });
export const categoryModel = mongoose.model("category", categorySchema);
//# sourceMappingURL=categoryModel.js.map