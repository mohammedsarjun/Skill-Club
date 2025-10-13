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
import { inject, injectable } from 'tsyringe';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { jwtService } from '../../utils/jwt.js';
import { jwtConfig } from '../../config/jwt.config.js';
let OtpController = class OtpController {
    constructor(otpService, userServices) {
        this._otpServices = otpService;
        this._userServices = userServices;
    }
    async createOtp(req, res) {
        const { email, purpose } = req.body;
        const otpResponse = await this._otpServices.createOtp(email, purpose);
        res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Otp Sent Successfully',
            data: otpResponse,
            purpose,
        });
        console.log('success');
    }
    async verifyOtp(req, res) {
        const { email, otp, userId } = req.body;
        const response = await this._otpServices.verifyOtp(email, otp);
        switch (response.purpose) {
            case 'signup':
                await this._userServices.markUserVerified(userId);
                // 🔹 Create tokens
                const payload = {
                    userId: userId,
                    roles: null,
                    activeRole: null,
                    isOnboardingCompleted: false,
                    clientProfile: null,
                    freelancerProfile: null
                };
                const accessToken = jwtService.createToken(payload, jwtConfig.accessTokenMaxAge);
                const refreshToken = jwtService.createToken(payload, jwtConfig.refreshTokenMaxAge);
                res.cookie('accessToken', accessToken, {
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
                    sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
                    maxAge: jwtConfig.accessTokenMaxAge * 1000
                });
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: jwtConfig.refreshTokenMaxAge * 1000
                });
                break;
            case 'forgotPassword':
                // maybe return a token or flag to allow password reset
                // await otpService.markOtpUsed(otpRecord.email);
                break;
            default:
                throw new Error('Unknown OTP purpose');
        }
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Otp Verfied Successfully',
            data: response,
        });
    }
};
OtpController = __decorate([
    injectable(),
    __param(0, inject('IOtpServices')),
    __param(1, inject('IUserServices')),
    __metadata("design:paramtypes", [Object, Object])
], OtpController);
export { OtpController };
//# sourceMappingURL=otpController.js.map