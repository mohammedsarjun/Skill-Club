import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository.js";
export default class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>);
    create(data: Partial<T>): Promise<T>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    update(id: string, data: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
//# sourceMappingURL=baseRepository.d.ts.map