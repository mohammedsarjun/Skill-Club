import adminRouterEndPoints from "@/types/endPoints/adminEndPoints";
import { axiosClient } from "./axiosClient";

export const adminAuthApi = {
  login: async (data:{email:string,password:string}): Promise<any> => {
    try {

      const response = await axiosClient.post(
        adminRouterEndPoints.adminLogin,
        data
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },


};
