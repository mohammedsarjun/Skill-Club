import { Document } from "mongoose";
export interface ICategory extends Document {
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ICategoryModel.d.ts.map