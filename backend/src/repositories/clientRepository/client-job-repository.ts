/**
 * @file client-job-repository.ts
 * @desc Repository responsible for performing database operations related to client jobs.
 *       It extends the BaseRepository to inherit generic CRUD operations while allowing
 *       job-specific implementations when needed.
 *
 * @layer Repository
 * @module Client
 * @category Jobs
 *
 * @dependencies
 * - jobModel (Mongoose model for the Job collection)
 * - BaseRepository (abstract class providing generic CRUD operations)
 * - IClientJobRepository (interface defining repository contract)
 * - IJob, JobData (TypeScript interfaces for strong typing)
 *
 * @class ClientJobRepository
 * @extends BaseRepository<IJob>
 *
 * @usage
 * This repository is used by ClientJobService to perform low-level
 * data persistence and retrieval tasks related to client jobs.
 * Example usage in service:
 * const createdJob = await this._clientJobRepository.createJob(jobModelData);
 *
 * @see IClientJobService
 * @see IClientJobRepository
 * @see BaseRepository
 */

import { jobModel } from '../../models/job.model';

import BaseRepository from '../baseRepositories/base-repository';
import { IClientJobRepository } from './interfaces/i-client-job-repository';
import { IJob, JobData } from '../../models/interfaces/i-job.model';

export class ClientJobRepository extends BaseRepository<IJob> implements IClientJobRepository {
  constructor() {
    super(jobModel);
  }
  // Creates a new job document in the database
  async createJob(jobData: Partial<JobData>): Promise<IJob | null> {
    return await super.create(jobData);
  }
}
