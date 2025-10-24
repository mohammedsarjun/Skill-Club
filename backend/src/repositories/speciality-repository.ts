import BaseRepository from './baseRepositories/base-repository';
import { ISpeciality } from '../models/interfaces/i-speciality.model';
import { ISpecialityRepository } from './interfaces/i-speciality-repository';
import { specialityModel } from '../models/speciality.model';

export class SpecialityRepository
  extends BaseRepository<ISpeciality>
  implements ISpecialityRepository
{
  constructor() {
    super(specialityModel);
  }

  getSpeciality(categoryId: string): Promise<ISpeciality[] | null> {
    return this.model.find({ category: categoryId });
  }
}
