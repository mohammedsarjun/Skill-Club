import { IWorklog } from '../../models/interfaces/worklog.model.interface';
import { IBaseRepository } from '../baseRepositories/interfaces/base-repository.interface';

export interface IWorklogRepository extends IBaseRepository<IWorklog> {
  createWorklog(data: Partial<IWorklog>): Promise<IWorklog>;
  getWorklogsByContractId(contractId: string): Promise<IWorklog[]>;
  getWorklogsByMilestoneId(milestoneId: string): Promise<IWorklog[]>;
  getWorklogById(worklogId: string): Promise<IWorklog | null>;
  getWorklogsByContractWithPagination(
    contractId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<IWorklog[]>;
  countWorklogsByContract(contractId: string, status?: string): Promise<number>;
  updateWorklogStatus(
    worklogId: string,
    status: 'approved' | 'rejected',
    reviewMessage?: string
  ): Promise<IWorklog | null>;
}
