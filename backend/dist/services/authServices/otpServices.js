var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'tsyringe';
import sendEmailOtp from '../../utils/sendOtp.js';
import { createOtpDigit } from '../../utils/otpGenerator.js';
import bcrypt from 'bcryptjs';
import { HttpStatus } from '../../enums/http-status.enum.js';
import AppError from '../../utils/AppError.js';
import { mapOtpModelToGetOtpDto } from '../../mapper/authMapper/otp.mapper.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
let OtpService = class OtpService {
    constructor(otpRepository, userRepository) {
        this._otpRepository = otpRepository;
        this._userRepository = userRepository;
    }
    async createOtp(email, purpose) {
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
    async verifyOtp(email, otp) {
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
    async findOtp(email) {
        try {
            const response = await this._otpRepository.findByEmail(email);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOtp(email) {
        try {
            const response = await this._otpRepository.deleteByEmail(email);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
OtpService = __decorate([
    injectable(),
    __param(0, inject('IOtpRepository')),
    __param(1, inject('IUserRepository')),
    __metadata("design:paramtypes", [Object, Object])
], OtpService);
export { OtpService };
//# sourceMappingURL=otpServices.js.map