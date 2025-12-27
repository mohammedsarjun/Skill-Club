import { Request, Response } from 'express';

export interface IClientContractController {
  getContractDetail(req: Request, res: Response): Promise<void>;
  cancelContract(req: Request, res: Response): Promise<void>;
  getContracts(req: Request, res: Response): Promise<void>;
  approveDeliverable(req: Request, res: Response): Promise<void>;
  requestDeliverableChanges(req: Request, res: Response): Promise<void>;
  approveMilestoneDeliverable(req: Request, res: Response): Promise<void>;
  requestMilestoneChanges(req: Request, res: Response): Promise<void>;
  respondToMilestoneExtension(req: Request, res: Response): Promise<void>;
  getMilestoneDetail(req: Request, res: Response): Promise<void> 
}
