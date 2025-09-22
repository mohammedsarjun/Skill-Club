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
import { inject, injectable } from "tsyringe";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { jwtService } from "../../utils/jwt.js";
let OtpController = class OtpController {
    constructor(otpService, userServices) {
        this.otpServices = otpService;
        this.userServices = userServices;
    }
    async createOtp(req, res) {
        try {
            let { email, purpose } = req.body;
            const otpResponse = await this.otpServices.createOtp(email, purpose);
            res.status(HttpStatus.CREATED).json({
                success: true,
                message: "Otp Sent Successfully",
                data: otpResponse,
                purpose
            });
        }
        catch (error) {
            throw error;
        }
    }
    async verifyOtp(req, res) {
        try {
            let { email, otp, userId } = req.body;
            const response = await this.otpServices.verifyOtp(email, otp);
            switch (response.purpose) {
                case "signup":
                    await this.userServices.markUserVerified(userId);
                    // 🔹 Create tokens
                    const payload = { userId: userId, role: null };
                    const accessToken = jwtService.createToken(payload, "15m");
                    const refreshToken = jwtService.createToken(payload, "7d");
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        secure: false, // 🔹 must be false on localhost (no HTTPS)
                        sameSite: "lax", // 🔹 "strict" blocks cross-site cookies
                        maxAge: 15 * 60 * 1000,
                    });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                    break;
                case "forgotPassword":
                    // maybe return a token or flag to allow password reset
                    // await otpService.markOtpUsed(otpRecord.email);
                    break;
                default:
                    throw new Error("Unknown OTP purpose");
            }
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Otp Verfied Successfully",
                data: response,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
OtpController = __decorate([
    injectable(),
    __param(0, inject("IOtpServices")),
    __param(1, inject("IUserServices")),
    __metadata("design:paramtypes", [Object, Object])
], OtpController);
export { OtpController };
//# sourceMappingURL=otpController.js.map