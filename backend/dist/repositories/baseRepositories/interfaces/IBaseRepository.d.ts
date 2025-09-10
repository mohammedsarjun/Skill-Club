import { FilterQuery, UpdateQuery } from "mongoose";
export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    update(id: string, data: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
//# sourceMappingURL=IBaseRepository.d.ts.map