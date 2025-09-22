import { axiosClient } from "./axiosClient";
import userRoutes from "@/types/endPoints/userEndPoints";


export const userApi = {
  roleSelection: async (role:string): Promise<any> => {
    try {

      const response = await axiosClient.post(
        userRoutes.roleSelection,
        {role}
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

};
