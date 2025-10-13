import { Types } from "mongoose";
import { IUserActionVerification } from "../../models/interfaces/IActionVerificationModel.js";
import BaseRepository from "../baseRepositories/baseRepository.js";
import { CreateActionVerificationDto } from "../../dto/actionVerification.dto.js";

export interface IActionVerificationRepository extends BaseRepository<IUserActionVerification>{
     createActionVerificaion(data:CreateActionVerificationDto): Promise<IUserActionVerification | null>
}