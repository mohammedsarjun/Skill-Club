import freelancerRouterEndPoints from "@/types/endPoints/freelancerEndPoint";
import { axiosClient } from "../axiosClient";

export const freelancerActionApi = {
  async getFreelancerData() {
    try {
      const response = await axiosClient.get(freelancerRouterEndPoints.me);
      
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
};
