import type { IOtp } from '../../models/interfaces/IOtpModel.js';
import type { IOtpRepository } from '../../repositories/interfaces/IOtpRepository.js';
import type { IOtpServices } from '../../services/authServices/interfaces/IOtpService.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import { GetOtpDto } from '../../dto/authDTO/otp.dto.js';
export declare class OtpService implements IOtpServices {
  private _otpRepository;
  private _userRepository;
  constructor(otpRepository: IOtpRepository, userRepository: IUserRepository);
  createOtp(email: string, purpose: 'signup' | 'forgotPassword'): Promise<GetOtpDto>;
  verifyOtp(
    email: string,
    otp: string,
  ): Promise<{
    purpose: 'signup' | 'forgotPassword';
  }>;
  findOtp(email: string): Promise<IOtp | null>;
  deleteOtp(email: string): Promise<IOtp | null>;
}
//# sourceMappingURL=otpServices.d.ts.map
