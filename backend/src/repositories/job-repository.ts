/**
 * @file job-repository.ts
 * @desc Repository responsible for performing database operations related to jobs.
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
 * @class JobRepository
 * @extends BaseRepository<IJob>
 *
 * @usage
 * This repository is used by JobService to perform low-level
 * data persistence and retrieval tasks related to client jobs.
 * Example usage in service:
 * const createdJob = await this._jobRepository.createJob(jobModelData);
 *
 * @see IClientJobService
 * @see IJobRepository
 * @see BaseRepository
 */

import { jobModel } from '../models/job.model';

import BaseRepository from './baseRepositories/base-repository';
import {
  IJob,
  IJobDetail,
  IJobWithCategoryDetail,
  JobData,
} from '../models/interfaces/job.model.interface';
import { IJobRepository } from './interfaces/job-repository.interface';
import { JobQueryParams } from 'src/dto/commonDTO/job-common.dto';

export class JobRepository extends BaseRepository<IJob> implements IJobRepository {
  constructor() {
    super(jobModel);
  }
  // Creates a new job document in the database
  async createJob(jobData: Partial<JobData>): Promise<IJob | null> {
    return await super.create(jobData);
  }

  async getAllJobs(
    filters: JobQueryParams,
    skip: number,
  ): Promise<IJobWithCategoryDetail[] | null> {
    const query = filters.filters;
    return await super.findAll(
      { title: { $regex: filters.search, $options: 'i' }, ...query },
      {
        skip,
        limit: filters.limit,
        populate: [
          { path: 'category', select: '_id name' },
          { path: 'clientId', select: '_id clientProfile.companyName' },
        ],
      },
    );
  }

  async getAllJobsByClientId(
    clientId: string,
    filters: JobQueryParams,
    skip: number,
  ): Promise<IJobWithCategoryDetail[]> {
    const query = filters.filters;
    return await super.findAll(
      { clientId: clientId, title: { $regex: filters.search, $options: 'i' }, ...query },
      {
        skip,
        limit: filters.limit,
        populate: [
          { path: 'category', select: '_id name' },
          { path: 'clientId', select: '_id clientProfile.companyName' },
        ],
      },
    );
  }

  async getJobByClientAndJobId(clientId: string, jobId: string): Promise<IJobDetail | null> {
    return await super.findOne(
      { _id: jobId, clientId: clientId },
      {
        populate: [
          { path: 'category', select: '_id name' },
          { path: 'clientId', select: '_id clientProfile.companyName clientProfile.logo' },
          { path: 'specialities', select: '_id name' },
          { path: 'skills', select: '_id name' },
        ],
      },
    );
  }

  async getJobById(jobId: string): Promise<IJobDetail | null> {
    return await super.findOne(
      { _id: jobId },
      {
        populate: [
          { path: 'category', select: '_id name' },
          { path: 'clientId', select: '_id clientProfile.companyName clientProfile.logo' },
          { path: 'specialities', select: '_id name' },
          { path: 'skills', select: '_id name' },
        ],
      },
    );
  }

  async updateJobStatus(jobId: string, status: string): Promise<IJob | null> {
    return await super.updateById(jobId, { status });
  }

  async rejectJob(jobId: string, rejectedReason: string): Promise<IJob | null> {
    return await super.updateById(jobId, { status: 'rejected', rejectedReason });
  }

  async suspendJob(jobId: string, suspendedReason: string): Promise<IJob | null> {
    return await super.updateById(jobId, { status: 'suspended', suspendedReason });
  }

  async updateJobById(jobId: string, jobData: Partial<JobData>): Promise<IJobDetail | null> {
    return await super.updateById(jobId, jobData);
  }

  async countAllJobs(): Promise<number> {
    return await super.count();
  }

  async countAllJobsByClientId(clientId: string): Promise<number> {
    return await super.count({ clientId });
  }
}
