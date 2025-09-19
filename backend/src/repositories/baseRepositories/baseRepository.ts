import { Model, Document, FilterQuery, UpdateQuery,PopulateOptions  } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository.js";
export default class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return await doc.save();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }



async findAll(
  filter: FilterQuery<T> = {},
  options?: { 
    skip?: number; 
    limit?: number; 
    populate?: PopulateOptions | PopulateOptions[] 
  }
): Promise<T[]> {
  let query = this.model.find(filter);

  if (options?.skip) query = query.skip(options.skip);
  if (options?.limit) query = query.limit(options.limit);
  if (options?.populate) query = query.populate(options.populate);

  return await query.exec();
}


  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return await this.model.countDocuments(filter).exec();
  }
}
