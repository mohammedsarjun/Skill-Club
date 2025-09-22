export interface ILanguage {
  name: string;
  proficiency: string; 
}

export interface IExperience{
  title:string,
  company:string,
  location:string,
  country:string,
  isCurrentRole:boolean,
  startMonth:number,
  startYear:number,
  endMonth?:number,
  endYear?:number
}

export interface IEducation{
  school:string,
  degree:string,
  fieldOfStudy:string,
  isCurrentEducation:boolean,
  startYear:number,
  endYear?:number,
  description:string
}

 interface IAddress {
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
}


export interface IFreelancerData{
  logo:string;
  workCategory: string;
  specialties:string[];
  skills: string[];
  professionalRole: string;
  experiences: IExperience[];
  educations: IEducation[];
  languages: ILanguage[];
  bio: string;
  hourlyRate: number;
  weeklyHours: number;
  address:IAddress
  portfolio: string;

}