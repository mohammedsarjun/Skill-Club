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
      console.log(response.data)
      return response.data;
    } catch (error:any) {
        return error.response.data
    }
  },

  getCategories: async():Promise<any>=>{
    try{
      const response = await axiosClient.get(adminEndPoint.adminGetCategories);
      return response.data;
    } catch (error) {
        console.log(error)
    }
  }
};

export default AdminActionApi
