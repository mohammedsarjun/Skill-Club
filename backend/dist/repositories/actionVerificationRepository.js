import { UserActionVerificationModel } from '../models/actionVerificationModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
export class ActionVerificationRepository extends BaseRepository {
    constructor() {
        super(UserActionVerificationModel);
    }
    async createActionVerificaion(data) {
        const { userId, actionType, actionData } = data;
        return super.create({ userId, actionType, actionData });
    }
}
//# sourceMappingURL=actionVerificationRepository.js.map