import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container';    
import { IClientMeetingController } from './interfaces/client-meeting-controller.interface';
import { IClientMeetingService } from '../../services/clientServices/interfaces/client-meeting-service.interface';
import { HttpStatus } from '../../enums/http-status.enum';
import { ClientMeetingProposalRequestDTO } from '../../dto/clientDTO/client-meeting.dto';

@injectable()
export class ClientMeetingController implements IClientMeetingController {
  private _clientMeetingService: IClientMeetingService;
  constructor(@inject('IClientMeetingService') clientMeetingService: IClientMeetingService) {
    this._clientMeetingService = clientMeetingService;
  }

  async proposeMeeting(req: Request, res: Response): Promise<void> {
    const clientId = req.user?.userId as string;
    const { contractId } = req.params;
    const meetingData = req.body as ClientMeetingProposalRequestDTO;



    const result = await this._clientMeetingService.proposeMeeting(clientId, contractId, meetingData);
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      data: result,
      message: 'Meeting proposed successfully',
    });
  }
}
