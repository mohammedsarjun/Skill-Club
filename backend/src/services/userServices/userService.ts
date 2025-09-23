import { injectable, inject } from "tsyringe";
import { IUserServices } from "./interfaces/IUserServices.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { mapFreelancerDtoToUserModel, mapUserModelToUserDto } from "../../mapper/userMapper/user.mapper.js";
import { UserDto } from "../../dto/userDTO/user.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";


@injectable()
export class userServices implements IUserServices {
  private userRepository: IUserRepository
  constructor(@inject("IUserRepository") userRepository: IUserRepository) {
    this.userRepository = userRepository
  }
  async markUserVerified(id: string): Promise<void> {
    try {

      const result = await this.userRepository.update(
        id,
        { $set: { isVerified: true } }
      );

    } catch (err: any) {
      // You can throw a custom error class if you have one
      throw new Error(`Failed to verify user: ${err.message}`);
    }
  }

  async selectRole(id: string | undefined, role: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id!);
    if (!user) {
      throw new AppError("User not found", HttpStatus.NOT_FOUND);
    }

    // If user already has the role, just return the DTO
    if (user.roles.includes(role)) {
      return mapUserModelToUserDto(user);
    }

    // Use repository to update roles & onboarding atomically
    const updatedUser = await this.userRepository.addRoleAndCompleteOnboarding(
      id!,
      role
    );

    return mapUserModelToUserDto(updatedUser!);
  }
  async createFreelancerProfile(
    id: string,
    freelancerData: Partial<IUser>
  ): Promise<IUser> {
    if (!id) {
      throw new Error("User ID is required");
    }

    if (!freelancerData || Object.keys(freelancerData).length === 0) {
      throw new Error("Freelancer data cannot be empty");
    }

    // Map DTO to model
    const dto = mapFreelancerDtoToUserModel(freelancerData);

    try {
      // Update user in the repository
      const updatedUser = await this.userRepository.update(id, dto);

      if (!updatedUser) {
        throw new Error(`User with id ${id} not found`);
      }

      return updatedUser;
    } catch (error) {
      console.error("Failed to create freelancer profile:", error);
      throw new Error("Failed to create freelancer profile");
    }
  }

}