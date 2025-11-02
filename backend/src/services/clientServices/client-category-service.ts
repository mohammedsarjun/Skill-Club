/**
 * @file client-category-service.ts
 * @description Service responsible for handling business logic related to client category operations.
 * It serves as a bridge between the ClientCategoryController and the data repositories,
 * performing validation, transformation, and repository interactions as needed.
 *
 * @layer Service
 * @module Client
 * @category Category
 *
 * @dependencies
 * - tsyringe: For dependency injection.
 * - CategoryRepository: For database operations related to categories.
 * - AppError & HttpStatus: For consistent error handling.
 *
 * @usage
 * This service is used by ClientCategoryController to perform all client-category-related
 * business operations such as fetching categories.
 * Example usage in controller:
 * const result = await this._clientCategoryService.getAllCategories();
 *
 * @see IClientCategoryController
 * @see IClientCategoryService
 * @see ICategoryRepository
 */

import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientCategoryService } from './interfaces/client-category-service.interface';
import { GetClientCategoryDTO } from '../../dto/clientDTO/client-category-dto';
import { mapCategoryModelToGetClientCategoryDTO } from '../../mapper/clientMapper/client-category-mapper';
import { ICategoryRepository } from 'src/repositories/interfaces/category-repository.interface';

@injectable()
export class ClientCategoryService implements IClientCategoryService {
  private _categoryRepository: ICategoryRepository;
  constructor(@inject('ICategoryRepository') categoryRepository: ICategoryRepository) {
    this._categoryRepository = categoryRepository;
  }

  /**
   * @description Fetches all client categories and maps them to DTOs.
   * @returns {Promise<GetClientCategoryDTO[]>} Returns an array of client category DTOs.
   */

  async getAllCategories(): Promise<GetClientCategoryDTO[]> {
    const categories = await this._categoryRepository.getCategories();

    const categoryDTOs: GetClientCategoryDTO[] =
      categories?.map(mapCategoryModelToGetClientCategoryDTO) || [];

    return categoryDTOs;
  }
}
