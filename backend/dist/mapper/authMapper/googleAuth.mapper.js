export const mapCreateGoogleUserDtoToUserModel = (dto) => {
    return {
        googleId: dto.sub,
        firstName: dto.given_name,
        lastName: dto.family_name,
        email: dto.email,
        avatar: dto.picture
    };
};
//# sourceMappingURL=googleAuth.mapper.js.map