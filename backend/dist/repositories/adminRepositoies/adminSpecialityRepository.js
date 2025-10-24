import BaseRepository from '../baseRepositories/baseRepository.js';
import { specialityModel } from '../../models/specialityModel.js';
export class AdminSpecialityRepository extends BaseRepository {
  constructor() {
    super(specialityModel);
  }
  async findAllWithFilters(filters, options) {
    // Build query
    const query = {};
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
    return await mongooseQuery.exec();
  }
}
//# sourceMappingURL=adminSpecialityRepository.js.map
