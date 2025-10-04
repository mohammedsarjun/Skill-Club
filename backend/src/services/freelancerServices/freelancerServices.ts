import { injectable, inject } from "tsyringe";
import "../../config/container.js"
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { IFreelancerService } from "./interfaces/IFreelancerServices.js";
import type{ IFreelancerRepository } from "../../repositories/interfaces/IFreelancerRepository.js";
import { mapFreelancerToDTO } from "../../mapper/freelancerMapper/freelancer.mapper.js";
import { GetFreelancerDTO } from "../../dto/freelancerDTO/freelancer.dto.js";

@injectable()
export class FreelancerService implements IFreelancerService {
    private _freelancerRepository: IFreelancerRepository
    constructor(@inject("IFreelancerRepository") freelancerRepository: IFreelancerRepository) {
        this._freelancerRepository = freelancerRepository
    }

 async getFreelancerData(id: string): Promise<GetFreelancerDTO> {
  try {
    const freelancerData = await this._freelancerRepository.getFreelancerById(id);

    if (!freelancerData || !freelancerData.freelancerProfile) {
      // More explicit error if the profile itself is missing
      throw new AppError("Freelancer or freelancer profile doesn't exist", HttpStatus.NOT_FOUND);
    }

    // Map the profile to DTO safely
    const freelancerDto = mapFreelancerToDTO(freelancerData);

    return freelancerDto;
  } catch (error) {
    console.error(`Error fetching freelancer data for ID: ${id}`, error);
    // You can throw a generic server error if needed
    throw new AppError("Failed to fetch freelancer data", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

}