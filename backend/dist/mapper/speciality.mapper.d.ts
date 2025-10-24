import { CreateSpecialityDTO, GetSpecialityDto, SpecialityDto, SpecialityDtoMinimal, SpecialityEntity, SpecialityQueryParams, UpdateSpecialityDTO } from '../dto/speciality.dto.js';
import { ISpeciality } from '../models/interfaces/i-speciality.model';
export declare const mapCreateSpecialityDtoToSpecialityModel: (dto: CreateSpecialityDTO) => Pick<ISpeciality, "name" | "category" | "status">;
export declare const mapUpdateSpecialityDtoToSpecialityModel: (dto: Partial<UpdateSpecialityDTO>) => Partial<Pick<ISpeciality, "name" | "category" | "status">>;
export declare function mapSpecialityQuery(dto: SpecialityQueryParams): GetSpecialityDto;
export declare const mapSpecialityModelToSpecialityDto: (speciality: SpecialityEntity) => SpecialityDto;
export declare const mapSpecialityModelToSpecialityDtoMinimal: (specaility: ISpeciality) => SpecialityDtoMinimal;
//# sourceMappingURL=speciality.mapper.d.ts.map