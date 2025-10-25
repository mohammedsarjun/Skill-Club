import { GetClientCategoryDTO } from 'src/dto/clientDTO/client-category-dto';
import { ICategory } from 'src/models/interfaces/i-category.model';

export const mapCategoryModelToGetClientCategoryDTO = (
  categoryData: ICategory,
): GetClientCategoryDTO => {
  return {
    categoryId: categoryData._id.toString(),
    categoryName: categoryData.name,
  };
};
