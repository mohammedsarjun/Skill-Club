import { otpModel } from '../models/otp.model';
import { IOtp } from '../models/interfaces/i-otp.model';
import BaseRepository from './baseRepositories/base-repository';
import type { IOtpRepository } from './interfaces/i-otp-repository';

export class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository {
  constructor() {
    super(otpModel);
  }
  async findByEmail(email: string): Promise<IOtp | null> {
    const response = await this.model.findOne({ email });
    return response;
  }
  async deleteByEmail(email: string): Promise<IOtp | null> {
    await this.model.deleteOne({ email });
    return null;
  }
}
