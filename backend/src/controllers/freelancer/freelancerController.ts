import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IFreelancerController } from './interfaces/IFreelancerController.js';
import type { IFreelancerService } from '../../services/freelancerServices/interfaces/IFreelancerServices.js';
import { GetFreelancerDTO } from '../../dto/freelancerDTO/freelancer.dto.js';

@injectable()
export class FreelancerController implements IFreelancerController {
  private _freelancerService: IFreelancerService;
  constructor(@inject('IFreelancerService') freelancerService: IFreelancerService) {
    this._freelancerService = freelancerService;
  }

  async getFreelancerData(req: Request, res: Response): Promise<void> {
    try {
        const userId=req.user?.userId
      const result:GetFreelancerDTO = await this._freelancerService.getFreelancerData(userId!);
      console.log(result)
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Freelancer Data Fetched Successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
