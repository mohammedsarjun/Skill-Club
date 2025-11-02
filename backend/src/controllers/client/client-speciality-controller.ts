/**
 * @file client-speciality-controller.ts
 * @description Controller responsible for handling client speciality-related operations.
 * It communicates with the ClientSpecialityService to perform actions such as retrieving
 * and managing speciality data for clients.
 *
 * @layer Controller
 * @module Client
 * @category Speciality
 *
 * @dependencies
 * - express: For handling HTTP requests and responses.
 * - tsyringe: For dependency injection.
 * - IClientSpecialityService: For business logic related to client specialities.
 *
 * @usage
 * This controller is used in client routes (/api/client/speciality)
 * to handle all speciality management operations on the client side.
 */

import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { HttpStatus } from '../../enums/http-status.enum';

import { IClientSpecialityController } from './interfaces/client-speciality-controller.interface';
import { IClientSpecialityService } from '../../services/clientServices/interfaces/client-speciality-service.interface';
import { MESSAGES } from '../../contants/contants';
import { GetClientSpecialityWithSkillsDTO } from 'src/dto/clientDTO/client-speciality-dto';
// import { GetClientSpecialityWithSkillsDTO } from 'src/dto/clientDTO/client-speciality-dto';

@injectable()
export class ClientSpecialityController implements IClientSpecialityController {
  private _clientSpecialityService: IClientSpecialityService;
  constructor(
    @inject('IClientSpecialityService') clientSpecialityService: IClientSpecialityService,
  ) {
    this._clientSpecialityService = clientSpecialityService;
  }

  /**
   * @description    Fetch all specialities for the authenticated client.
   * @route   POST /api/client/specialities
   * @access  Private (Client only)
   * @param   {Request} req -  Express request object containing authenticated client information.
   * @param   {Response} res - Express response object used to send HTTP responses.
   * @returns {Promise<void>} Sends a JSON response containing the list of specialities.
   * @throws  {AppError} Throws an error if specialities cannot be retrieved or database access fails.
   */
  async getSpecialityWithSkills(req: Request, res: Response): Promise<void> {
    const { selectedCategory } = req.query;
    const categoryData: GetClientSpecialityWithSkillsDTO[] =
      await this._clientSpecialityService.getSpecialityWithSkills(selectedCategory as string);

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.SPECIALITY.FETCH_SUCCESS,
      data: categoryData,
    });
  }
}
