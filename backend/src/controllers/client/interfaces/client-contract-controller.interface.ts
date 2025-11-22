import { Request, Response } from 'express';

export interface IClientContractController {
  getContractDetail(req: Request, res: Response): Promise<void>;
  cancelContract(req: Request, res: Response): Promise<void>;
  getContracts(req: Request, res: Response): Promise<void>;
}
