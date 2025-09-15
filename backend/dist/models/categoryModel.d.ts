import { Model, Document } from "mongoose";
export interface ICategory extends Document {
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const categoryModel: Model<ICategory>;
//# sourceMappingURL=categoryModel.d.ts.map