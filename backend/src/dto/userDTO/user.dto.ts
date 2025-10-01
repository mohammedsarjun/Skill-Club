export interface UserDto{
  userId:string,
  roles:string[],
  activeRole:string,
  isOnboardingCompleted:boolean,
  clientProfile?:string|undefined,
  freelancerProfile?:string|undefined
}

//Freelancer Profile Updatation DTO'S
export interface AddressDTO {
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
}

export interface LanguageDTO {
  name: string;
  proficiency: string;
  mandatory?: boolean;
}

export interface EducationDTO {
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface ExperienceDTO {
  title: string;
  company: string;
  location: string;
  country: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  currentRole?: boolean;
}

export interface FreelancerDTO {
  [key: string]: any; // To include numeric keys like '0' in your languages object
  '0'?: { name: string; proficiency: string }; // optional if needed
  category: string;
  specialties: string[];
  skills: string[];
  professionalRole: string;
  educations: EducationDTO[];
  languages: LanguageDTO[];
  bio: string;
  hourlyRate: number;
  logo: string;
  address: AddressDTO;
  experiences: ExperienceDTO[];
}


export interface ClientProfileDetailDTO {
  companyName:string,
  logo?:string,
  description?:string,
  website?:string
}

export interface ClientProfileDto{
  clientProfile:ClientProfileDetailDTO
}


export interface ClientProfileUpdateResponseDto{
   companyName:string,
  logo?:string,
  description?:string,
  website?:string
}
