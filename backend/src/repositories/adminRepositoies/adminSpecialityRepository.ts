

import BaseRepository from "../baseRepositories/baseRepository.js";
import { ISpeciality } from "../../models/interfaces/ISpecialityModel.js";
import { specialityModel } from "../../models/specialityModel.js";
import { IAdminSpecialityRepository } from "./interfaces/IAdminSpecialityRepository.js";

export class AdminSpecialityRepository extends BaseRepository<ISpeciality> implements IAdminSpecialityRepository{
  constructor() {
    super(specialityModel); 
  }
  async findAllWithFilters(
    filters: { search?: string; category?: string },
    options: {
      skip?: number;
      limit?: number;
      populate?: {
        path: string;
        select?: string;
      };
      select?: string;
    }
  ): Promise<ISpeciality[]> {
    // Build query
    const query: any = {};

    if (filters.search) {
      query.name = { $regex: filters.search, $options: "i" };
    }

    if (filters.category) {
      query.category = filters.category;
    }

    // Start Mongoose query
    let mongooseQuery = this.model.find(query);

    // Apply skip / limit
    if (options.skip !== undefined) mongooseQuery = mongooseQuery.skip(options.skip);
    if (options.limit !== undefined) mongooseQuery = mongooseQuery.limit(options.limit);

    // Apply select (projection)
    if (options.select) mongooseQuery = mongooseQuery.select(options.select);

    // Apply populate
    if (options.populate) {
      mongooseQuery = mongooseQuery.populate(options.populate.path, options.populate.select);
    }

    // Execute query and assert type
    return await mongooseQuery.exec() as ISpeciality[];
  }

}