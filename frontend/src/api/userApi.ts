import { IFreelancerData } from "@/types/interfaces/store/IFreelancerData";
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

  me:async (): Promise<any> => {
    try {

      const response = await axiosClient.get(
        userRoutes.me,
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  createFreelancerProfile:async (freelancerData: Omit<Partial<IFreelancerData>, "completedSteps">): Promise<any> => {
    try {

      const response = await axiosClient.post(
        userRoutes.createFreelancerProfile,freelancerData
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

};
