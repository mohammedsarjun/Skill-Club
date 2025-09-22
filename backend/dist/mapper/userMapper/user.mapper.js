export const mapUserModelToSelectRolesDto = (modelData) => {
    return {
        userId: modelData._id.toString(),
        roles: modelData.roles
    };
};
//# sourceMappingURL=user.mapper.js.map