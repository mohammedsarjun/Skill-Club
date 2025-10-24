import BaseRepository from './baseRepositories/baseRepository.js';
import { ISpeciality } from '../models/interfaces/ISpecialityModel.js';
import { ISpecialityRepository } from './interfaces/ISpecialityRepository.js';
export declare class SpecialityRepository
  extends BaseRepository<ISpeciality>
  implements ISpecialityRepository
{
  constructor();
  getSpeciality(categoryId: string): Promise<ISpeciality[] | null>;
}
//# sourceMappingURL=specialityRepository.d.ts.map
