import { Request, Response } from 'express';

export interface IClientJobController {
  createJob(req: Request, res: Response): Promise<void>;
}
