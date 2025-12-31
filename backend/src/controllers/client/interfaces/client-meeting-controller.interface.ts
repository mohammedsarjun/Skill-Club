import { Request, Response } from 'express';

export interface IClientMeetingController {
  proposeMeeting(req: Request, res: Response): Promise<void>;
}
