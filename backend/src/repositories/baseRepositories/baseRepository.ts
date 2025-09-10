
import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository.js";
export default class BaseRepository<T extends Document> implements IBaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return await doc.save();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return await this.model.find(filter).exec();
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
