import BaseRepository from "../../baseRepositories/baseRepository.js";
import { ISpeciality } from "../../../models/interfaces/ISpecialityModel.js";
export interface IAdminSpecialityRepository extends BaseRepository<ISpeciality>{
  findAllWithFilters(filters: any, options: any):Promise<ISpeciality[]|null>
} 