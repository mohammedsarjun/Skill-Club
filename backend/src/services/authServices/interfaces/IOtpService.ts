import { IOtp } from "../../../models/otpModel.js";

export interface IOtpServices {
    createOtp(email: string, otp: string): Promise<IOtp | null>
    findOtp(email: string): Promise<IOtp | null>
    deleteOtp(email: string): Promise<IOtp | null>
}