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
export const mapUserModelToGetUserDto = (modelData) => {
    return {
        id: modelData._id.toString(),
        firstName: modelData.firstName,
        lastName: modelData.lastName,
        email: modelData.email,
        phone: modelData.phone,
    };
};
//# sourceMappingURL=auth.mapper.js.map