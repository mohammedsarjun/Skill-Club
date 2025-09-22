import { GetOtpDto } from "../../../dto/authDTO/otp.dto.js";
import { IOtp } from "../../../models/interfaces/IOtpModel.js";
export interface IOtpServices {
    createOtp(email: string, purpose: "signup" | "forgotPassword"): Promise<GetOtpDto>;
    verifyOtp(email: string, otp: string): Promise<{
        purpose: "signup" | "forgotPassword";
    }>;
    findOtp(email: string): Promise<IOtp | null>;
    deleteOtp(email: string): Promise<IOtp | null>;
}
//# sourceMappingURL=IOtpService.d.ts.map