import type { IOtp } from '../../models/interfaces/IOtpModel.js';
import type { IOtpRepository } from '../../repositories/interfaces/IOtpRepository.js';
import type { IOtpServices } from '../../services/authServices/interfaces/IOtpService.js';
import { injectable, inject } from 'tsyringe';
import sendEmailOtp from '../../utils/sendOtp.js';
import { createOtpDigit } from '../../utils/otpGenerator.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import bcrypt from 'bcryptjs';
import { HttpStatus } from '../../enums/http-status.enum.js';
import AppError from '../../utils/AppError.js';
import { GetOtpDto } from '../../dto/authDTO/otp.dto.js';
import { mapOtpModelToGetOtpDto } from '../../mapper/authMapper/otp.mapper.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
@injectable()
export class OtpService implements IOtpServices {
  private _otpRepository: IOtpRepository;
  private _userRepository: IUserRepository;
  constructor(
    @inject('IOtpRepository') otpRepository: IOtpRepository,
    @inject('IUserRepository') userRepository: IUserRepository,
  ) {
    this._otpRepository = otpRepository;
    this._userRepository = userRepository;
  }

  async createOtp(email: string, purpose: 'signup' | 'forgotPassword'): Promise<GetOtpDto> {
    const user = await this._userRepository.findOne({ email });
    if (!user) {
      throw new AppError(ERROR_MESSAGES.AUTH.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const otpPlain = await createOtpDigit();
    const otp = await bcrypt.hash(otpPlain, 10);

    const existingOtp = await this._otpRepository.findOne({ email });
    if (existingOtp) {
      await this._otpRepository.deleteByEmail(email);
    }

    const expiresAt = new Date(Date.now() + 70 * 1000);
    const response = await this._otpRepository.create({ email, purpose, otp, expiresAt });
    const mappedRespone = mapOtpModelToGetOtpDto(response);

    await sendEmailOtp(email, otpPlain);

    return mappedRespone;
  }

  async verifyOtp(email: string, otp: string): Promise<{ purpose: 'signup' | 'forgotPassword' }> {
    const otpData = await this._otpRepository.findByEmail(email);

    if (!otpData) {
      throw new AppError(ERROR_MESSAGES.AUTH.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (otpData.expiresAt < new Date()) {
      throw new AppError(ERROR_MESSAGES.OTP.EXPIRED, HttpStatus.GONE);
    }

    const isMatched = await bcrypt.compare(otp, otpData.otp);

    if (!isMatched) {
      throw new AppError(ERROR_MESSAGES.OTP.INCORRECT_OTP, HttpStatus.UNAUTHORIZED);
    }

    const purpose = otpData.purpose;
    await this._otpRepository.deleteByEmail(email);
    return { purpose };
  }

  async findOtp(email: string): Promise<IOtp | null> {
    try {
      const response = await this._otpRepository.findByEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteOtp(email: string): Promise<IOtp | null> {
    try {
      const response = await this._otpRepository.deleteByEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
