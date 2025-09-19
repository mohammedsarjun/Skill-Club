import mongoose, { Document, Schema } from "mongoose";

export interface ISpeciality extends Document {
    _id:string
    name: string;
    category:string;
    status:string;
}