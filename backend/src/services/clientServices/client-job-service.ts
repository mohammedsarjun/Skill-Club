/**
 * @file client-job-service.ts
 * @description Service responsible for handling business logic related to client job operations.
 *       It serves as a bridge between the ClientJobController and the data repositories,
 *       performing validation, transformation, and repository interactions.
 *
 * @layer Service
 * @module Client
 * @category Jobs
 *
 * @dependencies
 * - tsyringe (for dependency injection)
 * - IClientJobRepository (for database operations related to jobs)
 * - IClientRepository (for validating client existence and profile)
 * - mapCreateJobDtoToJobModel (for transforming DTO to model data)
 * - validation utilities (for validating incoming data against schema)
 * - AppError & HttpStatus (for consistent error handling)
 *
 * @usage
 * This service is used by ClientJobController to perform all job-related
 * business operations such as creating, updating, or fetching jobs.
 * Example usage in controller:
 * const result = await this._clientJobService.createJob(clientId, jobData);
 *
 * @see IClientJobController
 * @see IClientJobService
 * @see IClientJobRepository
 */

import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { HttpStatus } from '../../enums/http-status.enum';
import { IClientJobService } from './interfaces/i-client-job-service';
import { IClientJobRepository } from '../../repositories/clientRepository/interfaces/i-client-job-repository';
import {CreateJobDto, JobResponseDto } from '../../dto/clientDTO/client-job.dto';
import { IClientRepository } from '../../repositories/clientRepository/interfaces/i-client-repository';
import AppError from '../../utils/app-error';
import { ERROR_MESSAGES } from '../../contants/error-constants';
import { mapCreateJobDtoToJobModel, mapJobModelDtoToResponseJobDto } from '../../mapper/clientMapper/client-job.mapper';
import { validateData } from '../../utils/validation';
import { createJobSchema } from '../../utils/validationSchemas/job-validations';
import { IJob } from '../../models/interfaces/i-job.model';

@injectable()
export class ClientJobService implements IClientJobService {
  private _clientJobRepository: IClientJobRepository;
  private _clientRepository: IClientRepository;
  constructor(
    @inject('IClientJobRepository') clientJobRepository: IClientJobRepository,
    @inject('IClientRepository') clientRepository: IClientRepository,
  ) {
    this._clientJobRepository = clientJobRepository;
    this._clientRepository = clientRepository;
  }

  /**
   * @desc    Validates and creates a new job for a specific client.
   * @param   {string} clientId - ID of the client creating the job.
   * @param   {CreateJobDto} jobData - Data transfer object containing job details.
   * @returns {Promise<JobResponseDto>} Returns updated Job data after job creation.
   * @throws  {AppError} If client does not exist or job creation fails.
   */
  async createJob(clientId: string, jobData: CreateJobDto): Promise<JobResponseDto> {
    validateData(createJobSchema, jobData);
    const clientData = await this._clientRepository.getClientById(clientId);
    if (!clientData || !clientData.clientProfile) {
      throw new AppError(ERROR_MESSAGES.CLIENT.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const jobModelData = mapCreateJobDtoToJobModel(jobData, clientId);

    const createdJob=await this._clientJobRepository.createJob(jobModelData)

    const responseJobData=mapJobModelDtoToResponseJobDto(createdJob as IJob) 

    return responseJobData
  }
}
