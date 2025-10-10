export const mapUserModelToUserDto = (modelData) => {
    return {
        userId: modelData._id.toString(),
        roles: modelData.roles,
        activeRole: modelData.activeRole,
        isOnboardingCompleted: modelData.isOnboardingCompleted,
        clientProfile: modelData?.clientProfile?.logo,
        freelancerProfile: modelData?.freelancerProfile?.logo
    };
};
export function mapFreelancerDtoToUserModel(raw) {
    return {
        freelancerProfile: {
            languages: Array.isArray(raw.languages)
                ? raw.languages.map((lang) => ({
                    name: lang.name || '',
                    proficiency: lang.proficiency || '',
                }))
                : [],
            workCategory: raw.category || '',
            specialties: Array.isArray(raw.specialties) ? raw.specialties : [],
            skills: Array.isArray(raw.skills) ? raw.skills.map((skill) => skill.value) : [],
            professionalRole: raw.professionalRole || '',
            education: Array.isArray(raw.educations)
                ? raw.educations.map((edu) => ({
                    school: edu.school || '',
                    degree: edu.degree || '',
                    fieldOfStudy: edu.field || '',
                    startYear: edu.startYear || '',
                    endYear: edu.endYear || '',
                }))
                : [],
            bio: raw.bio || '',
            hourlyRate: raw.hourlyRate || 0,
            logo: raw.logo || '',
            experiences: Array.isArray(raw.experiences)
                ? raw.experiences.map((exp) => ({
                    title: exp.title || '',
                    company: exp.company || '',
                    location: exp.location || '',
                    country: exp.country || '',
                    startMonth: exp.startMonth || '',
                    startYear: exp.startYear || '',
                    endMonth: exp.endMonth || '',
                    endYear: exp.endYear || '',
                    isCurrentRole: exp.currentRole || false,
                }))
                : [],
            portfolio: [],
        },
        address: raw.address
            ? {
                country: raw.address.country || '',
                streetAddress: raw.address.streetAddress || '',
                city: raw.address.city || '',
                state: raw.address.state || '',
                zipCode: raw.address.zipCode || 0,
            }
            : { country: '', streetAddress: '', city: '', state: '', zipCode: 0 },
    };
}
export function mapClientDtoToUserModel(raw) {
    return {
        clientProfile: {
            companyName: raw.companyName,
            logo: raw.logo ?? '',
            description: raw.description ?? '',
            website: raw.website ?? '',
        },
    };
}
export function mapUserModelToClientProfileUpdateResponseDto(raw) {
    return {
        companyName: raw.clientProfile.companyName,
        logo: raw.clientProfile.logo ?? '',
        description: raw.clientProfile.description ?? '',
        website: raw.clientProfile.website ?? '',
    };
}
//# sourceMappingURL=user.mapper.js.map