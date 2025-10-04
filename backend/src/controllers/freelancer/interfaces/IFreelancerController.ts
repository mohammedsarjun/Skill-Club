import { Request, Response } from "express";

export interface IFreelancerController {
  getFreelancerData(req: Request, res: Response): Promise<void>;

}