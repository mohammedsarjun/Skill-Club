import { IExperience, ILanguage, IUser } from '../models/interfaces/i-user.model';
import { EducationDTO, LanguageDTO, UpdateLanguageDTO, IEducationDTO, IAddress, FetchFreelancerDTO } from '../dto/freelancer.dto';
interface FreelancerUser {
    firstName?: string;
    lastName?: string;
    address?: IAddress;
    freelancerProfile?: {
        logo?: string;
        workCategory?: {
            _id: string;
            name: string;
        };
        specialties?: {
            _id: string;
            name: string;
        }[];
        skills?: {
            _id: string;
            name: string;
        }[];
        professionalRole?: string;
        experiences?: IExperience[];
        education?: FreelancerEducationDTO[];
        languages?: ILanguage[];
        bio?: string;
        hourlyRate?: number;
    };
}
export interface FreelancerEducationDTO {
    _id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear: number;
}
export declare const mapFreelancerToDTO: (user: Partial<FreelancerUser>) => FetchFreelancerDTO;
export declare const mapEducationToDTO: (edu: EducationDTO) => IEducationDTO;
export declare const mapLanguageToDTO: (lang: ILanguage) => LanguageDTO;
export declare const mapUpdateLanguageToDTO: (user: IUser) => UpdateLanguageDTO[];
export declare const mapUpdateWorkHistoryToDTO: (user: IUser) => IExperience[];
export declare const mapUpdateLanguageDtoToLanguage: (lang: ILanguage) => LanguageDTO;
export declare const mapEducationModelToDTO: (edu: FreelancerEducationDTO) => EducationDTO;
export declare const mapDtoToEducationModel: (edu: EducationDTO) => IEducationDTO;
export {};
//# sourceMappingURL=freelancer.mapper.d.ts.map