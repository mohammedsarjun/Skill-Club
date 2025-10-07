

import BaseRepository from './baseRepositories/baseRepository.js';
import { ISpeciality } from '../models/interfaces/ISpecialityModel.js';
import { ISpecialityRepository } from './interfaces/ISpecialityRepository.js';
import { specialityModel } from '../models/specialityModel.js';

export class SpecialityRepository extends BaseRepository<ISpeciality> implements ISpecialityRepository {
  constructor() {
    super(specialityModel);
  }
  
  getSpeciality(categoryId:string): Promise<ISpeciality[] | null> {
      return this.model.find({category:categoryId})
  }

}
