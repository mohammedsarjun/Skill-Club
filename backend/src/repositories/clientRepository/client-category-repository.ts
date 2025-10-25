/**
 * @file client-category-repository.ts
 * @description Repository responsible for performing database operations related to client categories.
 * It extends the BaseRepository to inherit generic CRUD operations while allowing
 * category-specific implementations when needed.
 *
 * @layer Repository
 * @module Client
 * @category Category
 *
 * @dependencies
 * - ICategory: Mongoose model for the Category collection.
 * - BaseRepository: Abstract class providing generic CRUD operations.
 *
 * @class ClientCategoryRepository
 * @extends BaseRepository<ICategory>
 *
 * @usage
 * This repository is used by ClientCategoryService to perform low-level
 * data persistence and retrieval tasks related to client categories.
 * Example usage in service:
 * const categories = await this._clientCategoryRepository.getAllCategories();
 *
 * @see IClientCategoryService
 * @see IClientCategoryRepository
 * @see BaseRepository
 */

import BaseRepository from '../baseRepositories/base-repository';
import { IClientCategoryRepository } from './interfaces/i-client-category-repository';
import { ICategory } from '../../models/interfaces/i-category.model';
import { categoryModel } from '../../models/category.model';

export class ClientCategoryRepository extends BaseRepository<ICategory> implements IClientCategoryRepository {
  constructor() {
    super(categoryModel);
  }
  // Fetch All Categories from category model
  async getAllCategories(): Promise<ICategory[] | null> {
      return await super.findAll()
  }
}
