import { GetOtpDto } from "../../dto/authDTO/otp.dto.js";
import { IOtp } from "../../models/interfaces/IOtpModel.js";

export const mapOtpModelToGetOtpDto = (
  modelData: IOtp
): GetOtpDto=> {
  return {
    email: modelData.email,
    expiresAt: modelData.expiresAt,
    purpose:modelData.purpose
  };
};
