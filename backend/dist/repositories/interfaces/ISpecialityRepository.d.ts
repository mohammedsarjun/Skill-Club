import BaseRepository from '../baseRepositories/baseRepository.js';
import { ISpeciality } from '../../models/interfaces/ISpecialityModel.js';
export interface ISpecialityRepository extends BaseRepository<ISpeciality> {
  getSpeciality(categoryId: string): Promise<ISpeciality[] | null>;
}
//# sourceMappingURL=ISpecialityRepository.d.ts.map
