import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientOfferController } from './interfaces/client-offer-controller.interface';
import { IClientOfferService } from '../../services/clientServices/interfaces/client-offer-service.interface';

@injectable()
export class ClientOfferController implements IClientOfferController {
  private _clientOfferService: IClientOfferService;
  constructor(@inject('IClientOfferService') clientOfferService: IClientOfferService) {
    this._clientOfferService = clientOfferService;
  }

  async createOffer(req: Request, res: Response): Promise<void> {
    const clientId = req.user?.userId as string;
    const offerData = req.body.offerData;
    console.log('Incoming createOffer payload:', JSON.stringify(offerData));
    const result = await this._clientOfferService.createOffer(clientId, offerData);
    res.status(201).json({ success: true, message: 'Offer created successfully', data: result });
  }
}
