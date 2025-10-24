"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserModelToGetUserDto = exports.mapCreateUserDtoToUserModel = void 0;
const mapCreateUserDtoToUserModel = (dto) => {
    return {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        password: dto.password,
        agreement: dto.agreement,
    };
};
exports.mapCreateUserDtoToUserModel = mapCreateUserDtoToUserModel;
const mapUserModelToGetUserDto = (modelData) => {
    return {
        id: modelData._id.toString(),
        firstName: modelData.firstName,
        lastName: modelData.lastName,
        email: modelData.email,
        phone: modelData.phone,
    };
};
exports.mapUserModelToGetUserDto = mapUserModelToGetUserDto;
//# sourceMappingURL=auth.mapper.js.map