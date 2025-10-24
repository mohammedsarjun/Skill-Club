import BaseRepository from '../baseRepositories/baseRepository.js';
import { ISpeciality } from '../../models/interfaces/ISpecialityModel.js';
import { IAdminSpecialityRepository } from './interfaces/IAdminSpecialityRepository.js';
export declare class AdminSpecialityRepository
  extends BaseRepository<ISpeciality>
  implements IAdminSpecialityRepository
{
  constructor();
  findAllWithFilters(
    filters: {
      search?: string;
      category?: string;
    },
    options: {
      skip?: number;
      limit?: number;
      populate?: {
        path: string;
        select?: string;
      };
      select?: string;
    },
  ): Promise<ISpeciality[]>;
}
//# sourceMappingURL=adminSpecialityRepository.d.ts.map
