"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserModelToUserProfileDto = exports.mapUserModelToUserDto = void 0;
exports.mapFreelancerDtoToUserModel = mapFreelancerDtoToUserModel;
exports.mapClientDtoToUserModel = mapClientDtoToUserModel;
exports.mapUserModelToClientProfileUpdateResponseDto = mapUserModelToClientProfileUpdateResponseDto;
exports.mapUserModelToAddressDto = mapUserModelToAddressDto;
exports.mapAddressDtoToUserModel = mapAddressDtoToUserModel;
exports.UserDetailDtoToUserModel = UserDetailDtoToUserModel;
exports.mapWorkHistoryToUserModel = mapWorkHistoryToUserModel;
const mongoose_1 = require("mongoose");
const mapUserModelToUserDto = (modelData) => {
    return {
        userId: modelData._id.toString(),
        roles: modelData.roles,
        activeRole: modelData.activeRole,
        isOnboardingCompleted: modelData.isOnboardingCompleted,
        clientProfile: modelData?.clientProfile?.logo,
        freelancerProfile: modelData?.freelancerProfile?.logo,
        isClientBlocked: modelData?.isClientBlocked,
        isFreelancerBlocked: modelData?.isFreelancerBlocked,
    };
};
exports.mapUserModelToUserDto = mapUserModelToUserDto;
const mapUserModelToUserProfileDto = (modelData) => {
    return {
        firstName: modelData.firstName || '',
        lastName: modelData.lastName || '',
        email: modelData.email || '',
        phone: modelData.phone || 0,
        dob: modelData.dob || undefined,
    };
};
exports.mapUserModelToUserProfileDto = mapUserModelToUserProfileDto;
function mapFreelancerDtoToUserModel(raw) {
    return {
        freelancerProfile: {
            languages: Array.isArray(raw.languages)
                ? raw.languages.map((lang) => ({
                    name: lang.name || '',
                    proficiency: lang.proficiency || '',
                }))
                : [],
            workCategory: new mongoose_1.Types.ObjectId(raw.category) || '',
            specialties: Array.isArray(raw.specialties)
                ? raw.specialties.map((spec) => new mongoose_1.Types.ObjectId(spec))
                : [],
            skills: Array.isArray(raw.skills)
                ? raw.skills.map((skill) => new mongoose_1.Types.ObjectId(skill.value))
                : [],
            professionalRole: raw.professionalRole || '',
            education: Array.isArray(raw.educations)
                ? raw.educations.map((edu) => ({
                    _id: edu.id,
                    school: edu.school || '',
                    degree: edu.degree || '',
                    fieldOfStudy: edu.field || '',
                    startYear: edu.startYear || 0,
                    endYear: edu.endYear,
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
                    startYear: exp.startYear || 0,
                    endMonth: exp.endMonth || undefined,
                    endYear: exp.endYear || undefined,
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
function mapClientDtoToUserModel(raw) {
    return {
        clientProfile: {
            companyName: raw.companyName,
            logo: raw.logo ?? '',
            description: raw.description ?? '',
            website: raw.website ?? '',
        },
    };
}
function mapUserModelToClientProfileUpdateResponseDto(raw) {
    return {
        companyName: raw.clientProfile.companyName,
        logo: raw.clientProfile.logo ?? '',
        description: raw.clientProfile.description ?? '',
        website: raw.clientProfile.website ?? '',
    };
}
function mapUserModelToAddressDto(raw) {
    return {
        country: raw?.address?.country,
        state: raw?.address?.state,
        streetAddress: raw?.address?.streetAddress,
        city: raw?.address?.city,
        zipCode: raw?.address?.zipCode,
    };
}
function mapAddressDtoToUserModel(address) {
    return {
        country: address?.country,
        state: address?.state,
        streetAddress: address?.streetAddress,
        city: address?.city,
        zipCode: address?.zipCode,
    };
}
function UserDetailDtoToUserModel(raw) {
    return {
        firstName: raw.firstName || '',
        lastName: raw.lastName || '',
        email: raw.email || '',
        phone: !isNaN(Number(raw.phone)) ? Number(raw.phone) : 0,
        dob: raw.dob,
    };
}
function mapWorkHistoryToUserModel(exp) {
    return {
        title: exp.title || '',
        company: exp.company || '',
        location: exp.location || '',
        country: exp.country || '',
        startMonth: exp.startMonth || '',
        startYear: exp.startYear || 0,
        endMonth: exp.endMonth || undefined,
        endYear: exp.endYear || undefined,
        isCurrentRole: exp.isCurrentRole || false,
    };
}
//# sourceMappingURL=user.mapper.js.map