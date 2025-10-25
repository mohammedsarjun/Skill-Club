import {CreateJobDto, JobResponseDto } from '../../../dto/clientDTO/client-job.dto';

export interface IClientJobService {
  createJob(clientId: string,jobData:CreateJobDto): Promise<JobResponseDto>;
}
