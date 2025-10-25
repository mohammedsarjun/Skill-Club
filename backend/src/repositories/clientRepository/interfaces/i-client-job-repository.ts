import BaseRepository from '../../baseRepositories/base-repository';

import { IJob, JobData } from '../../../models/interfaces/i-job.model';

export interface IClientJobRepository extends BaseRepository<IJob> {
      createJob(jobData: Partial<JobData>): Promise<IJob | null>;
}
