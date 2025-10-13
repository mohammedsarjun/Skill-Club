import { IUserActionVerification } from '../models/interfaces/IActionVerificationModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
import { IActionVerificationRepository } from './interfaces/IActionVerificationRepository.js';
import { CreateActionVerificationDto } from '../dto/actionVerification.dto.js';
export declare class ActionVerificationRepository extends BaseRepository<IUserActionVerification> implements IActionVerificationRepository {
    constructor();
    createActionVerificaion(data: CreateActionVerificationDto): Promise<IUserActionVerification | null>;
}
//# sourceMappingURL=actionVerificationRepository.d.ts.map