import { GetFreelancerCategoryDTO } from "src/dto/freelancerDTO/freelancer-category.dto";
import { ICategory } from "src/models/interfaces/category.model.interface";


export const mapCategoryModelToGetFreelancerCategoryDTO = (
  categoryData: ICategory,
): GetFreelancerCategoryDTO => {
  return {
    categoryId: categoryData._id.toString(),
    categoryName: categoryData.name,
  };
};
