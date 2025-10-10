export interface GetFreelancerDTO {
    name: string;
    address: Record<string, any> | undefined;
    logo?: string;
    workCategory: string;
    specialties: string[];
    skills: string[];
    professionalRole: string;
    experiences: ExperienceDTO[];
    education: EducationDTO[];
    languages: LanguageDTO[];
    bio: string;
    hourlyRate: number;
    portfolio: null;
}
export interface ExperienceDTO {
    title: string;
    company: string;
    location: string;
    country: string;
    isCurrentRole: boolean;
    startMonth: string;
    startYear: number;
    endMonth?: string | undefined;
    endYear?: number | undefined;
}
export interface EducationDTO {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear?: number | undefined;
    description: string;
}
export interface IAddress {
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
}
export interface LanguageDTO {
    name: string;
    proficiency: string;
}
export interface UpdateLanguageDTO {
    name: string;
    proficiency: string;
}
export interface UpdateExperienceDTO {
    title: string;
    company: string;
    location: string;
    country: string;
    isCurrentRole: boolean;
    startMonth: string;
    startYear: number;
    endMonth?: string;
    endYear?: number;
}
export interface UpdateEducationDTO {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear?: number;
    description: string;
}
export interface UpdateFreelancerProfileDTO {
    logo: string | undefined;
    workCategory: string;
    specialties: string[];
    skills: string[];
    professionalRole: string;
    experiences: UpdateExperienceDTO;
    education: UpdateEducationDTO;
    languages: UpdateLanguageDTO;
    bio: string;
    hourlyRate: number;
    portfolio: [];
}
//# sourceMappingURL=freelancer.dto.d.ts.map