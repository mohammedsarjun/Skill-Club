import { Model, Document } from "mongoose";
export interface IOtp extends Document {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}
export declare const otpModel: Model<IOtp>;
//# sourceMappingURL=otpModel.d.ts.map