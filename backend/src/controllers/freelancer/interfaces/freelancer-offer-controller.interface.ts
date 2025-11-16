import { Request, Response } from 'express';

export interface IFreelancerOfferController {
  getAllOffers(req: Request, res: Response): Promise<void>;
  getOfferDetail(req: Request, res: Response): Promise<void>;
}
