import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description:string;
    status:string;
    createdAt: Date;
    updatedAt: Date;
}