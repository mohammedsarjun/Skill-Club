import BaseRepository from '../baseRepositories/base-repository';
import { ISpeciality } from '../../models/interfaces/i-speciality.model';

export interface ISpecialityRepository extends BaseRepository<ISpeciality> {
  getSpeciality(categoryId: string): Promise<ISpeciality[] | null>;
}
