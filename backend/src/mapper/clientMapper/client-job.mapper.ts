import { Types } from 'mongoose';
import { CreateJobDto, JobResponseDto } from '../../dto/clientDTO/client-job.dto';
import { IJob, JobData } from '../../models/interfaces/i-job.model';

export const mapCreateJobDtoToJobModel = (
  jobData: CreateJobDto,
  clientId: string,
): Partial<JobData> => {
  return {
    title: jobData.title,
    description: jobData.description,
    category: jobData.category,
    specialities: jobData.specialities,
    skills: jobData.skills,
    rateType: jobData.rateType,
    hourlyRate: jobData.hourlyRate,
    fixedRate: jobData.fixedRate,
    clientId: new Types.ObjectId(clientId),
    slots: jobData.slots,
    applyUntil: jobData.applyUntil,
  };
};

export const mapJobModelDtoToResponseJobDto = (jobData: IJob): JobResponseDto => {
  return {
    title: jobData.title,
    description: jobData.description,
    category: jobData.category,
    specialities: jobData.specialities,
    skills: jobData.skills,
    rateType: jobData.rateType,
    hourlyRate: jobData.hourlyRate,
    fixedRate: jobData.fixedRate,
    clientId: jobData.clientId.toString(),
    slots: jobData.slots,
    status: jobData.status,
    applyUntil: jobData.applyUntil,
    createdAt: jobData.createdAt,
  };
};
