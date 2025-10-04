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
export interface LanguageDTO {
    name: string;
    proficiency: string;
}
//# sourceMappingURL=freelancer.dto.d.ts.map