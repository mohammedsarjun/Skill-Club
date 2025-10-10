import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';
import { IUserSpecialityServices } from './interfaces/IUserSpecialityServices.js';
import type { ISpecialityRepository } from '../../repositories/interfaces/ISpecialityRepository.js';
import { SpecialityDtoMinimal } from '../../dto/speciality.dto.js';
import { mapSpecialityModelToSpecialityDtoMinimal } from '../../mapper/speciality.mapper.js';

@injectable()
export class userSpecialityServices implements IUserSpecialityServices {
  private _specialityRepository: ISpecialityRepository;
  constructor(@inject('ISpecialityRepository') specialityRepository: ISpecialityRepository) {
    this._specialityRepository = specialityRepository;
  }

  async getSpecialities(categoryId:string): Promise<SpecialityDtoMinimal[] | null> {
       const result = await this._specialityRepository.getSpeciality(categoryId);
          // Map to DTO
      
          const dtoData: SpecialityDtoMinimal[] | null = result
            ? result.map(mapSpecialityModelToSpecialityDtoMinimal)
            : null;
      
          return dtoData;
  }
}
