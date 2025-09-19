

import BaseRepository from "../baseRepositories/baseRepository.js";
import { ISpeciality } from "../../models/interfaces/ISpecialityModel.js";
import { specialityModel } from "../../models/specialityModel.js";
import { IAdminSpecialityRepository } from "./interfaces/IAdminSpecialityRepository.js";

export class AdminSpecialityRepository extends BaseRepository<ISpeciality> implements IAdminSpecialityRepository{
  constructor() {
    super(specialityModel); 
  }

}