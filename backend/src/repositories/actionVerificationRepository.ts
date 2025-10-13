import { UserActionVerificationModel } from '../models/actionVerificationModel.js';
import { IUserActionVerification } from '../models/interfaces/IActionVerificationModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
import { IActionVerificationRepository } from './interfaces/IActionVerificationRepository.js';
import { CreateActionVerificationDto } from '../dto/actionVerification.dto.js';


export class ActionVerificationRepository extends BaseRepository<IUserActionVerification> implements IActionVerificationRepository {
  constructor() {
    super(UserActionVerificationModel);
  }

  async createActionVerificaion(data:CreateActionVerificationDto): Promise<IUserActionVerification | null> {
    const {userId,actionType,actionData} = data
      return super.create({userId,actionType,actionData})
  }
}
