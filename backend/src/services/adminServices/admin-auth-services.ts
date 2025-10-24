import { injectable } from 'tsyringe';
import { IAdminAuthServices } from './interfaces/i-admin-auth-services';

import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { ERROR_MESSAGES } from '../../contants/error-constants';

@injectable()
export class AdminAuthServices implements IAdminAuthServices {
  constructor() {}

  login(adminData: { email: string; password: string }): void {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail != adminData?.email || adminPassword != adminData?.password)
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }
}
