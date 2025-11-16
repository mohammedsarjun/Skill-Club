import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { HttpStatus } from '../../enums/http-status.enum';
import { IFreelancerOfferController } from './interfaces/freelancer-offer-controller.interface';
import { IFreelancerOfferService } from '../../services/freelancerServices/interfaces/freelancer-offer-service.interface';
import { FreelancerOfferQueryParamsDTO } from '../../repositories/interfaces/offer-repository.interface';

@injectable()
export class FreelancerOfferController implements IFreelancerOfferController {
  private _freelancerOfferService: IFreelancerOfferService;
  constructor(
    @inject('IFreelancerOfferService') freelancerOfferService: IFreelancerOfferService,
  ) {
    this._freelancerOfferService = freelancerOfferService;
  }

  async getAllOffers(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { search, page, limit, status, offerType } = req.query as Record<string, string>;
    const query: FreelancerOfferQueryParamsDTO = {
      search,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      filters: {
        status: status as any,
        offerType: offerType as any,
      },
    };
    const result = await this._freelancerOfferService.getAllOffers(freelancerId, query);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Offers fetched successfully',
      data: result,
    });
  }

  async getOfferDetail(req: Request, res: Response): Promise<void> {
    const freelancerId = req.user?.userId as string;
    const { offerId } = req.params;
    const result = await this._freelancerOfferService.getOfferDetail(freelancerId, offerId);
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Offer not found' });
      return;
    }
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Offer detail fetched successfully',
      data: result,
    });
  }
}
