import { GetFreelancerDTO } from "../../../dto/freelancerDTO/freelancer.dto.js";

export interface IFreelancerService {
    getFreelancerData(id:string): Promise<GetFreelancerDTO>
}