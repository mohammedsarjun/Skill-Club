import "../../config/container.js";
import { IFreelancerService } from "./interfaces/IFreelancerServices.js";
import type { IFreelancerRepository } from "../../repositories/interfaces/IFreelancerRepository.js";
import { GetFreelancerDTO } from "../../dto/freelancerDTO/freelancer.dto.js";
export declare class FreelancerService implements IFreelancerService {
    private _freelancerRepository;
    constructor(freelancerRepository: IFreelancerRepository);
    getFreelancerData(id: string): Promise<GetFreelancerDTO>;
}
//# sourceMappingURL=freelancerServices.d.ts.map