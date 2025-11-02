/**
 * @file client-category-controller.ts
 * @description Controller responsible for handling client category-related operations.
 * It interacts with the ClientCategoryService to perform actions such as retrieving
 * and managing category data for clients.
 *
 * @layer Controller
 * @module Client
 * @category Category
 *
 * @dependencies
 * - express: Handles HTTP request and response objects.
 * - tsyringe: Provides dependency injection for cleaner architecture.
 * - IClientCategoryService: Defines the interface for category-related business logic.
 *
 * @route /api/client/category
 * @usage
 * Used in client-side routes to manage category operations such as:
 *   - Fetching all categories
 *   - Retrieving category by ID
 *   - Other category-related client actions
 */

import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { HttpStatus } from '../../enums/http-status.enum';
import { IClientCategoryController } from './interfaces/client-category-controller.interface';
import { IClientCategoryService } from '../../services/clientServices/interfaces/client-category-service.interface';
import { MESSAGES } from '../../contants/contants';
import { GetClientCategoryDTO } from '../../dto/clientDTO/client-category-dto';

@injectable()
export class ClientCategoryController implements IClientCategoryController {
  private _clientCategoryService: IClientCategoryService;
  constructor(@inject('IClientCategoryService') clientCategoryService: IClientCategoryService) {
    this._clientCategoryService = clientCategoryService;
  }

  /**
   * @description Fetch all categories for the authenticated client.
   * @route       GET /api/client/categories
   * @access      Private (Client only)
   *
   * @param       {Request} req - Express request object containing authenticated client information.
   * @param       {Response} res - Express response object used to send HTTP responses.
   *
   * @returns     {Promise<void>} Sends a JSON response containing the list of categories.
   *
   * @throws      {AppError} Throws an error if categories cannot be retrieved or database access fails.
   */

  async getAllCategories(_req: Request, res: Response): Promise<void> {
    const categoryData: GetClientCategoryDTO[] =
      await this._clientCategoryService.getAllCategories();

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.CATEGORY.FETCH_SUCCESS,
      data: categoryData,
    });
  }
}
