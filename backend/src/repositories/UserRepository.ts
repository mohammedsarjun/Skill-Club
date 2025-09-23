import { User } from "../models/userModel.js";
import { IUser } from "../models/interfaces/IUserModel.js"
import { Model, Document, FilterQuery, UpdateQuery, Types } from "mongoose";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IUserRepository } from "./interfaces/IUserRepository.js";
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {


  constructor() {
    super(User);
  }

  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email });
  }

  async updateResetPassword(userId: string | Types.ObjectId, token: string, expiry: Date): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: expiry,
        },
      },
      { new: true } // return the updated document if needed
    );
  }

  async updatePassword(userId: string | Types.ObjectId, hashedPassword: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetPasswordToken: "",
          resetPasswordExpires: "",
        },
      },
      { new: true }
    );
  }

  async findByResetToken(token: string) {
    // MongoDB-specific logic stays here
    console.log(token,"repo")
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // token not expired
    });
  }

      async addRoleAndCompleteOnboarding(
        userId: string | Types.ObjectId,
        role: string
    ) {
        const update: any = {
            $addToSet: { roles: role }, // add role if not exists
            $set: { activeRole: role, isOnboardingCompleted: true }
        };

        if (role === "freelancer") {
            update.$set.isFreelancerBoardingCompleted = true;
        }

        return await User.findByIdAndUpdate(userId, update, { new: true });
    }


}
