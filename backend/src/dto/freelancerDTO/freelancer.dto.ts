// DTO for sending freelancer profile data
export interface GetFreelancerDTO {
  name:string,
  address:Record<string,any>|undefined,
  logo?: string; // optional, as it can be undefined
  workCategory: string;
  specialties: string[];
  skills: string[];
  professionalRole: string;
  experiences: ExperienceDTO[];
  education: EducationDTO[];
  languages: LanguageDTO[];
  bio: string;
  hourlyRate: number;
  portfolio: null 
}

// Experience DTO
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


// Education DTO
export interface EducationDTO {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number|undefined;
  description: string;
}

// Language DTO
export interface LanguageDTO {
  name: string;
  proficiency: string; // e.g., 'Native', 'Professional', 'Beginner'
}

