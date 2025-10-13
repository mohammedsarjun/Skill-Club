import { Request, Response } from 'express';
import '../../config/container.js';
import { IFreelancerController } from './interfaces/IFreelancerController.js';
import type { IFreelancerService } from '../../services/freelancerServices/interfaces/IFreelancerServices.js';
export declare class FreelancerController implements IFreelancerController {
    private _freelancerService;
    constructor(freelancerService: IFreelancerService);
    getFreelancerData(req: Request, res: Response): Promise<void>;
    updateFreelancerLanguage(req: Request, res: Response): Promise<void>;
    deleteFreelancerLanguage(req: Request, res: Response): Promise<void>;
    createPortfolio(req: Request, res: Response): Promise<void>;
    getPortfolio(req: Request, res: Response): Promise<void>;
    getPortfolioDetail(req: Request, res: Response): Promise<void>;
    updateFreelancerDescription(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=freelancerController.d.ts.map