import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    _id:string
    name: string;
    description:string;
    status:string;
    createdAt: Date;
    updatedAt: Date;
}