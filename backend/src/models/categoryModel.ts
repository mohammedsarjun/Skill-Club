
import mongoose, { Model, Document, Schema } from "mongoose";
import { ICategory } from "./interfaces/ICategoryModel.js";


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    description: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        enum:["list","unlist"],
        default:"list"
    }

},{timestamps:true});


export const categoryModel:Model<ICategory>=mongoose.model<ICategory>("category",categorySchema)