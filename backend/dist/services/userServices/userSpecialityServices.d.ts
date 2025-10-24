import { IUserSpecialityServices } from './interfaces/IUserSpecialityServices.js';
import type { ISpecialityRepository } from '../../repositories/interfaces/ISpecialityRepository.js';
import { SpecialityDtoMinimal } from '../../dto/speciality.dto.js';
export declare class userSpecialityServices implements IUserSpecialityServices {
  private _specialityRepository;
  constructor(specialityRepository: ISpecialityRepository);
  getSpecialities(categoryId: string): Promise<SpecialityDtoMinimal[] | null>;
}
//# sourceMappingURL=userSpecialityServices.d.ts.map
