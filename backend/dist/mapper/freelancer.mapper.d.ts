import { ILanguage, IUser } from "../models/interfaces/IUserModel.js";
import { GetFreelancerDTO, LanguageDTO, UpdateLanguageDTO } from "../dto/freelancer.dto.js";
export declare const mapFreelancerToDTO: (user: Partial<IUser>) => GetFreelancerDTO;
export declare const mapLanguageToDTO: (lang: ILanguage) => LanguageDTO;
export declare const mapUpdateLanguageToDTO: (user: IUser) => UpdateLanguageDTO[];
export declare const mapUpdateLanguageDtoToLanguage: (lang: ILanguage) => LanguageDTO;
//# sourceMappingURL=freelancer.mapper.d.ts.map