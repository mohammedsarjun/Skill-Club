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
 * - IClientCategoryRepository: For database operations related to client categories.
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
 * @see IClientCategoryRepository
 */

import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientCategoryService } from './interfaces/i-client-category-service';
import { GetClientCategoryDTO } from '../../dto/clientDTO/client-category-dto';
import { IClientCategoryRepository } from '../../repositories/clientRepository/interfaces/i-client-category-repository';
import { mapCategoryModelToGetClientCategoryDTO } from '../../mapper/clientMapper/client-category-mapper';

@injectable()
export class ClientCategoryService implements IClientCategoryService {
  private _clientCategoryRepository: IClientCategoryRepository;
  constructor(
    @inject('IClientCategoryRepository') clientCategoryRepository: IClientCategoryRepository,
  ) {
    this._clientCategoryRepository = clientCategoryRepository;
  }

  /**
   * @description Fetches all client categories and maps them to DTOs.
   * @returns {Promise<GetClientCategoryDTO[]>} Returns an array of client category DTOs.
   */
  async getAllCategories(): Promise<GetClientCategoryDTO[]> {
    const categories = await this._clientCategoryRepository.getAllCategories();

    const categoryDTOs: GetClientCategoryDTO[] =
      categories?.map(mapCategoryModelToGetClientCategoryDTO) || [];

    return categoryDTOs;
  }
}
