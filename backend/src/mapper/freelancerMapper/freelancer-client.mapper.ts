import { FreelancerClientMinimalDTO } from "src/dto/freelancerDTO/freelancer-client.dto";
import { IUser } from "src/models/interfaces/user.model.interface";

export function mapuserModelToFreelancerClientMinimalDTO(userData: IUser,totalJobsPosted:number):FreelancerClientMinimalDTO{
    return {
        companyName: userData.clientProfile.companyName,
        country: userData.address.country,
        rating:0,
        totalJobsPosted  
    }
}