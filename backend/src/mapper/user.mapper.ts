import {
  AddressDTO,
  ClientProfileDetailDTO,
  ClientProfileDto,
  ClientProfileUpdateResponseDto,
  UserDto,
  UserProfileDto,
} from '../dto/userDTO/user.dto.js';
import { IUser } from '../models/interfaces/IUserModel.js';

export const mapUserModelToUserDto = (modelData: IUser): UserDto => {
  return {
    userId: modelData._id.toString(),
    roles: modelData.roles,
    activeRole: modelData.activeRole,
    isOnboardingCompleted: modelData.isOnboardingCompleted,
    clientProfile:modelData?.clientProfile?.logo,
    freelancerProfile:modelData?.freelancerProfile?.logo,
    isClientBlocked:modelData?.isClientBlocked,
    isFreelancerBlocked:modelData?.isFreelancerBlocked
  };
};



export const mapUserModelToUserProfileDto = (modelData: IUser): UserProfileDto => {
  return {
    firstName:modelData.firstName||"",
    lastName:modelData.lastName||"",
    email:modelData.email||"",
    phone:modelData.phone||0,
    dob:modelData.dob||undefined
  };
};

export function mapFreelancerDtoToUserModel(raw: any): Partial<IUser> {

  return {
    
    freelancerProfile: {
      languages: Array.isArray(raw.languages)
        ? raw.languages.map((lang: any) => ({
            name: lang.name || '',
            proficiency: lang.proficiency || '',
          }))
        : [],
      workCategory: raw.category || '',
      specialties: Array.isArray(raw.specialties) ? raw.specialties : [],
      skills: Array.isArray(raw.skills) ? raw.skills.map((skill:{value:string,name:string})=>skill.value) : [],
      professionalRole: raw.professionalRole || '',
      education: Array.isArray(raw.educations)
        ? raw.educations.map((edu: any) => ({
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
        ? raw.experiences.map((exp: any) => ({
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

export function mapClientDtoToUserModel(raw: ClientProfileDetailDTO): ClientProfileDto {
  return {
    clientProfile: {
      companyName: raw.companyName,
      logo: raw.logo ?? '',
      description: raw.description ?? '',
      website: raw.website ?? '',
    },
  };
}

export function mapUserModelToClientProfileUpdateResponseDto(
  raw: IUser,
): ClientProfileUpdateResponseDto {
  return {
      companyName: raw.clientProfile.companyName,
      logo: raw.clientProfile.logo ?? '',
      description: raw.clientProfile.description ?? '',
      website: raw.clientProfile.website ?? '',
  };
}


export  function mapUserModelToAddressDto(raw:IUser):AddressDTO{
   return {
      country: raw?.address?.country,
      state:raw?.address?.state,
      streetAddress:raw?.address?.streetAddress,
      city:raw?.address?.city,
      zipCode:raw?.address?.zipCode
  };
}