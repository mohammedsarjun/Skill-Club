import { axiosClient } from "../axiosClient";
import adminEndPoint from "@/types/endPoints/adminEndPoints";
import { IcategoryData } from "@/types/interfaces/admin/IAdmin";

const AdminActionApi = {
  createCategory: async (data: IcategoryData): Promise<any> => {
    try {
      const response = await axiosClient.post(
        adminEndPoint.adminCreateCategory,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  getCategories: async (
    search: string = "",
    page: number = 1,
    limit: number = 10
  ): Promise<any> => {
    try {
      const response = await axiosClient.get(adminEndPoint.adminGetCategories, {
        params: {
          search,
          page,
          limit,
        },
      });
      console.log(response.data)
      // return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
};

export default AdminActionApi;
