import { Request, Response } from 'express';

export interface IFreelancerWorklogController {
  submitWorklog(req: Request, res: Response): Promise<void>;
  getWorklogsByContract(req: Request, res: Response): Promise<void>;
}
