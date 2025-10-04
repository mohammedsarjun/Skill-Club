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
  }, logout: async (): Promise<any> => {
    try {
      const response = await axiosClient.post(
        adminRouterEndPoints.logout,
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
  me:async (): Promise<any> => {
    try {

      const response = await axiosClient.get(adminRouterEndPoints.me);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }


};
