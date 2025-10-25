/**
 * @file client-job-controller.ts
 * @description Controller responsible for handling client job-related operations.
 *       It communicates with the ClientJobService to perform actions such as
 *       creating new jobs, fetching job details, updating, or deleting jobs.
 *
 * @layer Controller
 * @module Client
 * @category Jobs
 *
 * @dependencies
 * - express (for handling HTTP requests/responses)
 * - tsyringe (for dependency injection)
 * - IClientJobService (for business logic related to jobs)
 *
 * @usage
 * This controller is used in client routes (/api/client/jobs)
 * to handle all job management operations from the client side.
 */

import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { HttpStatus } from '../../enums/http-status.enum';
import { IClientJobController } from './interfaces/i-client-job-controller';
import { IClientJobService } from '../../services/clientServices/interfaces/i-client-job-service';

@injectable()
export class ClientJobController implements IClientJobController {
  private _clientJobService: IClientJobService;
  constructor(@inject('IClientJobService') clientJobService: IClientJobService) {
    this._clientJobService = clientJobService;
  }

  /**
   * @description    Creates a new job for the authenticated client.
   * @route   POST /api/client/jobs
   * @access  Private (Client only)
   * @param   {Request} req - Express request object containing user and job data.
   * @param   {Response} res - Express response object for sending HTTP responses.
   * @returns {Promise<void>} Responds with success message and created job details.
   * @throws  {AppError} Throws error if job creation fails.
   */

  async createJob(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const jobData = req.body;

    const result = await this._clientJobService.createJob(userId as string, jobData);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Job Created Successfully',
      data: result,
    });
  }
}
