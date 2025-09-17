import { ICategory } from "../../models/interfaces/ICategoryModel.js";
import { categoryModel } from "../../models/categoryModel.js";
import BaseRepository from "../baseRepositories/baseRepository.js";
import { IAdminCategoryRepository } from "./interfaces/IAdminCategoryRepository.js";

export class AdminCategoryRepository extends BaseRepository<ICategory> implements IAdminCategoryRepository{
  constructor() {
    super(categoryModel); 
  }

}