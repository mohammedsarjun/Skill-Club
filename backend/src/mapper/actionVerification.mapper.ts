import { Types  } from "mongoose";
import { CreateActionVerificationDto } from "../dto/actionVerification.dto.js";




export function mapActionVerificationToCreateActionVerification(
  dto: Omit<CreateActionVerificationDto, "userId"> & { userId: string }
): CreateActionVerificationDto {
  return {
    userId: new Types.ObjectId(dto.userId), // convert string to ObjectId
    actionType: dto.actionType,
    actionData: dto.actionData
  };
}
