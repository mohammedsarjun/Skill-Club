import { IWorklog } from '../../models/interfaces/worklog.model.interface';
import { WorklogResponseDTO } from '../../dto/freelancerDTO/freelancer-worklog.dto';

export function mapWorklogToResponseDTO(worklog: IWorklog): WorklogResponseDTO {
  return {
    worklogId: worklog.worklogId,
    contractId: worklog.contractId.toString(),
    milestoneId: worklog.milestoneId?.toString(),
    freelancerId: worklog.freelancerId.toString(),
    startTime: worklog.startTime,
    endTime: worklog.endTime,
    duration: worklog.duration,
    files: worklog.files,
    description: worklog.description,
    status: worklog.status,
    createdAt: worklog.createdAt || new Date(),
  };
}
