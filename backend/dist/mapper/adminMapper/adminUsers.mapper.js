export const mapUserModelDtoToAdminUserStatsDto = (dto) => {
    return {
        totalUsers: dto.totalUsers,
        totalClients: dto.totalClients,
        totalFreelancers: dto.totalFreelancers,
    };
};
export function mapUserQuery(dto) {
    return {
        search: dto.search || '',
        page: dto.page ? Number(dto.page) : 1,
        limit: dto.limit ? Number(dto.limit) : 10,
        filters: { role: dto?.filters?.role, status: dto?.filters?.status },
    };
}
export function mapUpdateUserStatusToUserModel(dto) {
    return {
        id: dto.id,
        status: dto.status,
        role: dto.role,
    };
}
export function mapUserModelDtoToAdminUserDto(dto) {
    return {
        id: dto._id?.toString(),
        name: dto.firstName + dto.lastName,
        email: dto.email,
        roles: dto.roles,
    };
}
export function mapUserToUserDetailDto(user) {
    console.log(user);
    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName ? user.lastName : ''}`,
        email: user.email || '',
        phone: user.phone || 0,
        roles: user.roles || [],
        isClientBlocked: user.isClientBlocked || false,
        isFreelancerBlocked: user.isFreelancerBlocked || false,
        freelancerDetail: user.freelancerProfile
            ? {
                freelancerLogo: user.freelancerProfile.logo || '',
                professionalRole: user.freelancerProfile.professionalRole || '',
                hourlyRate: String(user.freelancerProfile.hourlyRate || ''),
                languages: (user.freelancerProfile.languages || []).map((lang) => lang.name),
            }
            : undefined,
        clientDetail: user.clientProfile
            ? {
                companyName: user.clientProfile.companyName || '',
                companyLogo: user.clientProfile.logo || '',
                website: user.clientProfile.website || '',
                companyDescription: user.clientProfile.description || '',
            }
            : undefined,
    };
}
//# sourceMappingURL=adminUsers.mapper.js.map