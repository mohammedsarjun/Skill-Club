export const mapUserModelDtoToAdminUserStatsDto = (dto) => {
    return {
        totalUsers: dto.totalUsers,
        totalClients: dto.totalClients,
        totalFreelancers: dto.totalFreelancers,
    };
};
export function mapUserQuery(dto) {
    return {
        search: dto.search || "",
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
        filters: { role: dto?.filters?.role, status: dto?.filters?.status }
    };
}
export function mapUserModelDtoToAdminUserDto(dto) {
    return {
        id: dto._id?.toString(),
        name: dto.firstName + dto.lastName,
        email: dto.email,
        roles: dto.roles,
        status: dto.isBlocked ? "blocked" : "active"
    };
}
//# sourceMappingURL=adminUsers.mapper.js.map