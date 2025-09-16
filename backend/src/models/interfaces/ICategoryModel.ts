import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description:string;
    isActive:boolean;
    createdAt: Date;
    updatedAt: Date;
}