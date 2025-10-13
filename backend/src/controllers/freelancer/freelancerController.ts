import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IFreelancerController } from './interfaces/IFreelancerController.js';
import type { IFreelancerService } from '../../services/freelancerServices/interfaces/IFreelancerServices.js';
import { GetFreelancerDTO } from '../../dto/freelancer.dto.js';
import { MESSAGES } from '../../contants/contants.js';
import { IFreelancerProfile } from '../../models/interfaces/IUserModel.js';

@injectable()
export class FreelancerController implements IFreelancerController {
  private _freelancerService: IFreelancerService;
  constructor(@inject('IFreelancerService') freelancerService: IFreelancerService) {
    this._freelancerService = freelancerService;
  }

  async getFreelancerData(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const result: GetFreelancerDTO = await this._freelancerService.getFreelancerData(userId!);

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.Freelancer.FETCH_SUCCESS,
      data: result,
    });
  }

  async updateFreelancerLanguage(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const result: Partial<IFreelancerProfile> | undefined =
      await this._freelancerService.updateFreelancerLanguage(userId as string, req.body);

    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.Freelancer.UPDATED,
      data: result,
    });
  }

  async deleteFreelancerLanguage(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    console.log(req.body);
    const { language } = req.query;
    await this._freelancerService.deleteFreelancerLanguage(userId as string, language as string);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Language Deleted Successfully',
    });
  }

  async createPortfolio(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const portfolioData = req.body.portfolioData;
    const result = await this._freelancerService.createPortfolio(userId as string, portfolioData);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Portfolio Created',
    });
  }

  async getPortfolio(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;

    const result = await this._freelancerService.getPortfolio(userId as string);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Portfolio Fetched Succcessfully',
      data: result,
    });
  }

  async getPortfolioDetail(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const { portfolioId } = req.query;
    const result = await this._freelancerService.getPortfolioDetail(
      userId as string,
      portfolioId as string,
    );

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Portfolio Fetched Succcessfully',
      data: result,
    });
  }

  async updateFreelancerDescription(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const description  = req.body.description;
    const result = await this._freelancerService.updateFreelancerDescription(
      userId as string,
      description,
    );

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Freelancer Description Update Succcessfully',
      data: result,
    });
  }
}
