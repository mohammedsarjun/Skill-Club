import BaseRepository from "../baseRepositories/baseRepository.js";
import { ICategory } from "../../models/interfaces/ICategoryModel.js";

export interface ICategoryRepository extends BaseRepository<ICategory>{
    getCategories():Promise<ICategory[]|null>
}