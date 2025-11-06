import { GetFreelancerSpecialityWithSkillsDTO } from "src/dto/freelancerDTO/freelancer-speciality.dto";

export interface IFreelancerSpecialityService {
  getSpecialityWithSkills(
      selectedCategory: string,
    ): Promise<GetFreelancerSpecialityWithSkillsDTO[]> 
}
