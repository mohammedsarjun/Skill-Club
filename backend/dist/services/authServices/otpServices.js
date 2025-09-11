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
import { injectable, inject } from "tsyringe";
import sendEmailOtp from "../../utils/sendOtp.js";
let OtpService = class OtpService {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    async createOtp(email, otp) {
        try {
            const response = await this.otpRepository.create({ email, otp });
            sendEmailOtp(email, otp);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findOtp(email) {
        try {
            const response = await this.otpRepository.findByEmail(email);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOtp(email) {
        try {
            const response = await this.otpRepository.deleteByEmail(email);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
OtpService = __decorate([
    injectable(),
    __param(0, inject("IOtpRepository")),
    __metadata("design:paramtypes", [Object])
], OtpService);
export { OtpService };
//# sourceMappingURL=otpServices.js.map