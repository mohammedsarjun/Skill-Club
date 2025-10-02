import { ISkill } from '../../models/interfaces/ISkillModel.js';
import { skillModel } from '../../models/skillModel.js';
import BaseRepository from '../baseRepositories/baseRepository.js';
import { IAdminSkillRepository } from './interfaces/IAdminSkillRepository.js';

export class AdminSkillRepository extends BaseRepository<ISkill> implements IAdminSkillRepository {
  constructor() {
    super(skillModel);
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
    },
  ): Promise<ISkill[]> {
    // Build query
    const query: any = {};

    if (filters.search) {
      query.name = { $regex: filters.search, $options: 'i' };
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
    return (await mongooseQuery.exec()) as ISkill[];
  }
}
