import { IOtpController } from './interfaces/IOtpController.js';
import { Request, Response } from 'express';
import type { IOtpServices } from '../../services/authServices/interfaces/IOtpService.js';
import type { IUserServices } from '../../services/userServices/interfaces/IUserServices.js';
export declare class OtpController implements IOtpController {
  private _otpServices;
  private _userServices;
  constructor(otpService: IOtpServices, userServices: IUserServices);
  createOtp(req: Request, res: Response): Promise<void>;
  verifyOtp(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=otpController.d.ts.map
