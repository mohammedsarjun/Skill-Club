import { IFreelancerData } from "@/types/interfaces/store/IFreelancerData";
import { axiosClient } from "./axiosClient";
import userRoutes from "@/types/endPoints/userEndPoints";
import { IClientProfile } from "@/types/interfaces/user/IUser";

export const userApi = {
  roleSelection: async (role: string): Promise<any> => {
    try {
      const response = await axiosClient.post(userRoutes.roleSelection, {
        role,
      });

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  me: async (): Promise<any> => {
    try {
      const response = await axiosClient.get(userRoutes.me);

      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.data;
    }
  },

  createFreelancerProfile: async (
    freelancerData: Omit<Partial<IFreelancerData>, "completedSteps">
  ): Promise<any> => {
    try {
      const response = await axiosClient.post(
        userRoutes.createFreelancerProfile,
        freelancerData
      );

      return response?.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
  createClientProfile: async (clientData: IClientProfile): Promise<any> => {
    try {
      const response = await axiosClient.post(
        userRoutes.createClientProfile,
        clientData
      );

      return response?.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
  switchAccount: async (): Promise<any> => {
    try {
      const response = await axiosClient.get(userRoutes.switchRole);
      return response?.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
};
