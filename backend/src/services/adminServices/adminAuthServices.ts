import { inject, injectable } from "tsyringe";
import { IAdminAuthServices } from "./interfaces/IAdminAuthServices.js";

import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { ERROR_MESSAGES } from "../../contants/errorConstants.js";

@injectable()
export class AdminAuthServices implements IAdminAuthServices {


  constructor() {

  }

  login(adminData: { email: string; password: string; }): void {
      const adminEmail=process.env.ADMIN_EMAIL
      const adminPassword=process.env.ADMIN_PASSWORD

      if(adminEmail!=adminData?.email || adminPassword!=adminData?.password) throw new AppError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,HttpStatus.UNAUTHORIZED)
  }

}
