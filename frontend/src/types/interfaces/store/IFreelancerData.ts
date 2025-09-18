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


export interface IFreelancerData{
  workCategory: string;
  specialties:string[];
  skills: string[];
  professionalRole: string;
  experience: IExperience[];
  education: IEducation[];
  languages: ILanguage[];
  bio: string;
  hourlyRate: number;
  weeklyHours: number;
  portfolio: string;

}