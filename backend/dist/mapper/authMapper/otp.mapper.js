"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOtpModelToGetOtpDto = void 0;
const mapOtpModelToGetOtpDto = (modelData) => {
    return {
        email: modelData.email,
        expiresAt: modelData.expiresAt,
        purpose: modelData.purpose,
    };
};
exports.mapOtpModelToGetOtpDto = mapOtpModelToGetOtpDto;
//# sourceMappingURL=otp.mapper.js.map