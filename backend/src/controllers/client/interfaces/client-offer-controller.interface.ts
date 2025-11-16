import { Request, Response } from 'express';
export interface IClientOfferController {
  createOffer(req: Request, res: Response): Promise<void>;
}
