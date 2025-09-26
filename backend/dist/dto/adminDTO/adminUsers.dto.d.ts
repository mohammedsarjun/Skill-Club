export interface AdminUserStatsDto {
    totalUsers: number;
    totalFreelancers: number;
    totalClients: number;
}
export interface GetUserDto {
    search?: string;
    page?: number;
    limit?: number;
    filters?: {
        role: "client" | "freelancer";
        status: boolean;
    };
}
export interface AdminUserDto {
    id: string;
    name: string;
    email: string;
    roles: string[];
    status: string;
}
//# sourceMappingURL=adminUsers.dto.d.ts.map