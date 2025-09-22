export const mapOtpModelToGetOtpDto = (modelData) => {
    return {
        email: modelData.email,
        expiresAt: modelData.expiresAt,
        purpose: modelData.purpose
    };
};
//# sourceMappingURL=otp.mapper.js.map