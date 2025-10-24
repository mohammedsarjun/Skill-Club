import {
  CreateSpecialityDTO,
  GetSpecialityDto,
  SpecialityDto,
  UpdateSpecialityDTO,
} from '../../dto/adminDTO/speciality.dto.js';
import { ISpeciality } from '../../models/interfaces/ISpecialityModel.js';
export declare const mapCreateSpecialityDtoToSpecialityModel: (
  dto: CreateSpecialityDTO,
) => Pick<ISpeciality, 'name' | 'category' | 'status'>;
export declare const mapUpdateSpecialityDtoToSpecialityModel: (
  dto: Partial<UpdateSpecialityDTO>,
) => Partial<Pick<ISpeciality, 'name' | 'category' | 'status'>>;
export declare function mapSpecialityQuery(dto: any): GetSpecialityDto;
export declare const mapSpecialityModelToSpecialityDto: (speciality: any) => SpecialityDto;
//# sourceMappingURL=speciality.mapper.d.ts.map
