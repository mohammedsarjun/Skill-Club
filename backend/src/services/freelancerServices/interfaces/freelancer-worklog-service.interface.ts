import { SubmitWorklogDTO, WorklogResponseDTO } from '../../../dto/freelancerDTO/freelancer-worklog.dto';

export interface IFreelancerWorklogService {
  submitWorklog(freelancerId: string, data: SubmitWorklogDTO): Promise<WorklogResponseDTO>;
  getWorklogsByContract(freelancerId: string, contractId: string): Promise<WorklogResponseDTO[]>;
}
