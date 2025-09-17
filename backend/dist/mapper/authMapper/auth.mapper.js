export const mapCreateUserDtoToUserModel = (dto) => {
    return {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        password: dto.password,
        agreement: dto.agreement
    };
};
//# sourceMappingURL=auth.mapper.js.map