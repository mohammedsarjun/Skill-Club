import { Types } from "mongoose";
export function mapActionVerificationToCreateActionVerification(dto) {
    return {
        userId: new Types.ObjectId(dto.userId), // convert string to ObjectId
        actionType: dto.actionType,
        actionData: dto.actionData
    };
}
//# sourceMappingURL=actionVerification.mapper.js.map