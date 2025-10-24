import { Request, Response } from 'express';
export interface IFreelancerController {
  getFreelancerData(req: Request, res: Response): Promise<void>;
  updateFreelancerLanguage(req: Request, res: Response): Promise<void>;
  deleteFreelancerLanguage(req: Request, res: Response): Promise<void>;
  updateFreelancerDescription(req: Request, res: Response): Promise<void>;
  createPortfolio(req: Request, res: Response): Promise<void>;
  getPortfolio(req: Request, res: Response): Promise<void>;
  getPortfolioDetail(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=IFreelancerController.d.ts.map
