import { injectable, inject } from "tsyringe";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { IAdminUserServices } from "./interfaces/IAdminUserServices.js";
import type{ IUserRepository } from "../../repositories/interfaces/IUserRepository.js";

@injectable()
export class AdminUserServices implements IAdminUserServices {
  private _userRepository;

  constructor(
    @inject("IUserRepository")
    userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  getUserStats(): Promise<any> {
      return Promise.resolve()
  }


}
