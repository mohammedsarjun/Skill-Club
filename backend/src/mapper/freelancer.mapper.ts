import { IExperience, IEducation, ILanguage, IUser } from "../models/interfaces/IUserModel.js";
import { GetFreelancerDTO, ExperienceDTO, EducationDTO, LanguageDTO, UpdateLanguageDTO } from "../dto/freelancer.dto.js";

// Mapper function
export const mapFreelancerToDTO = (user: Partial<IUser>): GetFreelancerDTO => {
  return {
    name:`${user?.firstName} ${user?.lastName}`,
    address:user.address,
    logo: user?.freelancerProfile?.logo||"",
    workCategory: user?.freelancerProfile?.workCategory||"",
    specialties: user?.freelancerProfile?.specialties||[],
    skills: user?.freelancerProfile?.skills||[],
    professionalRole: user?.freelancerProfile?.professionalRole||"",
    experiences: user?.freelancerProfile?.experiences.map(mapExperienceToDTO)||[],
    education: user?.freelancerProfile?.education.map(mapEducationToDTO)||[],
    languages: user?.freelancerProfile?.languages.map(mapLanguageToDTO)||[],
    bio: user?.freelancerProfile?.bio||"",
    hourlyRate: user?.freelancerProfile?.hourlyRate||0,
    portfolio: null // as per your DTO definition
  };
};

// Experience mapper
const mapExperienceToDTO = (exp: IExperience): ExperienceDTO => {
return {
  title: exp.title,
  company: exp.company,
  location: exp.location,
  country: exp.country,
  isCurrentRole: exp.isCurrentRole,
  startMonth: exp.startMonth,
  startYear: exp.startYear,
  endMonth: exp.endMonth||undefined,
  endYear: exp.endYear||undefined
}
};

// Education mapper
const mapEducationToDTO = (edu: IEducation): EducationDTO => ({
  school: edu.school,
  degree: edu.degree,
  fieldOfStudy: edu.fieldOfStudy,
  startYear: edu.startYear,
  endYear: edu.endYear,
  description: edu.description
});

// Language mapper
export const mapLanguageToDTO = (lang: ILanguage): LanguageDTO => ({
  name: lang.name,
  proficiency: lang.proficiency
});

//response
export const mapUpdateLanguageToDTO = (user: IUser): UpdateLanguageDTO[] => {
  return user.freelancerProfile.languages;
};

// request
export const mapUpdateLanguageDtoToLanguage = (lang: ILanguage): LanguageDTO => ({
  name: lang.name,
  proficiency: lang.proficiency
});
