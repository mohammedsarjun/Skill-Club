import type { IOtp } from "../../models/interfaces/IOtpModel.js";
import type {IOtpRepository} from "../../repositories/interfaces/IOtpRepository.js";
import type {IOtpServices} from "../../services/authServices/interfaces/IOtpService.js";
import { injectable,inject } from "tsyringe";
import sendEmailOtp from "../../utils/sendOtp.js";
@injectable()
export class OtpService implements IOtpServices {
  private otpRepository: IOtpRepository;
  constructor(@inject("IOtpRepository") otpRepository: IOtpRepository) {
    this.otpRepository = otpRepository;
  }

  async createOtp(email: string, otp: string): Promise<IOtp | null> {
    try {
 
      const response = await this.otpRepository.create({email, otp});
      sendEmailOtp(email,otp)
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findOtp(email: string): Promise<IOtp | null> {
    try {
      const response = await this.otpRepository.findByEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteOtp(email: string): Promise<IOtp | null> {
    try {
      const response = await this.otpRepository.deleteByEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  }
}