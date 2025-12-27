import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IFreelancerWorklogController } from './interfaces/freelancer-worklog-controller.interface';
import { IFreelancerWorklogService } from '../../services/freelancerServices/interfaces/freelancer-worklog-service.interface';
import { HttpStatus } from '../../enums/http-status.enum';
import { SubmitWorklogDTO } from '../../dto/freelancerDTO/freelancer-worklog.dto';

@injectable()
export class FreelancerWorklogController implements IFreelancerWorklogController {
  private _freelancerWorklogService: IFreelancerWorklogService;

  constructor(
    @inject('IFreelancerWorklogService') freelancerWorklogService: IFreelancerWorklogService
  ) {
    this._freelancerWorklogService = freelancerWorklogService;
  }

  async submitWorklog(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const data: SubmitWorklogDTO = req.body;

    const result = await this._freelancerWorklogService.submitWorklog(freelancerId, data);

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Worklog submitted successfully',
      data: result,
    });
  }

  async getWorklogsByContract(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { contractId } = req.params;

    const result = await this._freelancerWorklogService.getWorklogsByContract(freelancerId, contractId);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Worklogs fetched successfully',
      data: result,
    });
  }
}
