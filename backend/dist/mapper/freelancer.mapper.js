"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDtoToEducationModel = exports.mapEducationModelToDTO = exports.mapUpdateLanguageDtoToLanguage = exports.mapUpdateWorkHistoryToDTO = exports.mapUpdateLanguageToDTO = exports.mapLanguageToDTO = exports.mapEducationToDTO = exports.mapFreelancerToDTO = void 0;
const mapFreelancerToDTO = (user) => {
    return {
        name: `${user?.firstName} ${user?.lastName}`,
        address: user.address,
        logo: user?.freelancerProfile?.logo || '',
        workCategory: user?.freelancerProfile?.workCategory,
        specialties: user?.freelancerProfile?.specialties?.map((spec) => spec) || [],
        skills: user?.freelancerProfile?.skills?.map((skill) => skill) || [],
        professionalRole: user?.freelancerProfile?.professionalRole || '',
        experiences: user?.freelancerProfile?.experiences?.map(mapExperienceToDTO) || [],
        education: user?.freelancerProfile?.education?.map((edu) => (0, exports.mapEducationModelToDTO)(edu)) || [],
        languages: user?.freelancerProfile?.languages?.map(exports.mapLanguageToDTO) || [],
        bio: user?.freelancerProfile?.bio || '',
        hourlyRate: user?.freelancerProfile?.hourlyRate || 0,
        portfolio: null,
    };
};
exports.mapFreelancerToDTO = mapFreelancerToDTO;
const mapExperienceToDTO = (exp) => {
    return {
        id: exp._id,
        title: exp.title,
        company: exp.company,
        location: exp.location,
        country: exp.country,
        isCurrentRole: exp.isCurrentRole,
        startMonth: exp.startMonth,
        startYear: exp.startYear,
        endMonth: exp.endMonth || undefined,
        endYear: exp.endYear || undefined,
    };
};
const mapEducationToDTO = (edu) => ({
    school: edu.school,
    degree: edu.degree,
    fieldOfStudy: edu.field,
    startYear: edu.startYear,
    endYear: edu.endYear,
});
exports.mapEducationToDTO = mapEducationToDTO;
const mapLanguageToDTO = (lang) => ({
    name: lang.name,
    proficiency: lang.proficiency,
});
exports.mapLanguageToDTO = mapLanguageToDTO;
const mapUpdateLanguageToDTO = (user) => {
    return user.freelancerProfile.languages;
};
exports.mapUpdateLanguageToDTO = mapUpdateLanguageToDTO;
const mapUpdateWorkHistoryToDTO = (user) => {
    return user.freelancerProfile.experiences;
};
exports.mapUpdateWorkHistoryToDTO = mapUpdateWorkHistoryToDTO;
const mapUpdateLanguageDtoToLanguage = (lang) => ({
    name: lang.name,
    proficiency: lang.proficiency,
});
exports.mapUpdateLanguageDtoToLanguage = mapUpdateLanguageDtoToLanguage;
const mapEducationModelToDTO = (edu) => ({
    id: edu._id,
    school: edu.school,
    degree: edu.degree,
    field: edu.fieldOfStudy,
    startYear: edu.startYear,
    endYear: edu.endYear,
});
exports.mapEducationModelToDTO = mapEducationModelToDTO;
const mapDtoToEducationModel = (edu) => ({
    school: edu.school,
    degree: edu.degree,
    fieldOfStudy: edu.field,
    startYear: edu.startYear,
    endYear: edu.endYear,
});
exports.mapDtoToEducationModel = mapDtoToEducationModel;
//# sourceMappingURL=freelancer.mapper.js.map