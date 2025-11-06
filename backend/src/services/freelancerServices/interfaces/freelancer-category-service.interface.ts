import { GetFreelancerCategoryDTO } from "src/dto/freelancerDTO/freelancer-category.dto";

export interface IFreelancerCategoryService {
  getAllCategories(): Promise<GetFreelancerCategoryDTO[]>;
}