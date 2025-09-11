import type { IOtp } from "../../models/otpModel.js";
import type { IOtpRepository } from "../../repositories/interfaces/IOtpRepository.js";
import type { IOtpServices } from "../../services/authServices/interfaces/IOtpService.js";
export declare class OtpService implements IOtpServices {
    private otpRepository;
    constructor(otpRepository: IOtpRepository);
    createOtp(email: string, otp: string): Promise<IOtp | null>;
    findOtp(email: string): Promise<IOtp | null>;
    deleteOtp(email: string): Promise<IOtp | null>;
}
//# sourceMappingURL=otpServices.d.ts.map