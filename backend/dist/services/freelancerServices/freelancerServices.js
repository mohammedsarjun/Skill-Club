var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from "tsyringe";
import "../../config/container.js";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { mapFreelancerToDTO } from "../../mapper/freelancerMapper/freelancer.mapper.js";
let FreelancerService = class FreelancerService {
    constructor(freelancerRepository) {
        this._freelancerRepository = freelancerRepository;
    }
    async getFreelancerData(id) {
        try {
            const freelancerData = await this._freelancerRepository.getFreelancerById(id);
            if (!freelancerData || !freelancerData.freelancerProfile) {
                // More explicit error if the profile itself is missing
                throw new AppError("Freelancer or freelancer profile doesn't exist", HttpStatus.NOT_FOUND);
            }
            // Map the profile to DTO safely
            const freelancerDto = mapFreelancerToDTO(freelancerData);
            return freelancerDto;
        }
        catch (error) {
            console.error(`Error fetching freelancer data for ID: ${id}`, error);
            // You can throw a generic server error if needed
            throw new AppError("Failed to fetch freelancer data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
FreelancerService = __decorate([
    injectable(),
    __param(0, inject("IFreelancerRepository")),
    __metadata("design:paramtypes", [Object])
], FreelancerService);
export { FreelancerService };
//# sourceMappingURL=freelancerServices.js.map