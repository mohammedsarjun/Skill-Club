import { Request, Response } from 'express';

export interface IFreelancerContractController {
  getContracts(req: Request, res: Response): Promise<void>;
}
