import { Model, Document, FilterQuery, UpdateQuery, PopulateOptions } from 'mongoose';
import { IBaseRepository } from './interfaces/IBaseRepository.js';
export default class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected model: Model<T>;
  constructor(model: Model<T>);
  create(data: Partial<T>): Promise<T>;
  findOne(
    filter: FilterQuery<T>,
    options?: {
      populate?: PopulateOptions | PopulateOptions[];
    },
  ): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  findAll(
    filter?: FilterQuery<T>,
    options?: {
      skip?: number;
      limit?: number;
      populate?: PopulateOptions | PopulateOptions[];
    },
  ): Promise<T[]>;
  update(id: string, data: UpdateQuery<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  count(filter?: FilterQuery<T>): Promise<number>;
}
//# sourceMappingURL=baseRepository.d.ts.map
