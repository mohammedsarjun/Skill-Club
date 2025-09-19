
import mongoose, { Model, Document, Schema } from "mongoose";
import { ISpeciality } from "./interfaces/ISpecialityModel.js";


const specialitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    category: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        enum:["list","unlist"],
        default:"list"
    }

},{timestamps:true});


export const specialityModel:Model<ISpeciality>=mongoose.model<ISpeciality>("speciality",specialitySchema)