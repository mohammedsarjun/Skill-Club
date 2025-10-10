import onboardingRoutes from "@/types/endPoints/onboardingEndpoint";
import { axiosClient } from "./axiosClient";

export const onboardingApi = {
  getCategories: async (): Promise<any> => {
    try {
      const response = await axiosClient.get(onboardingRoutes.getcategories);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
  getSpecialities: async (categoryId:string): Promise<any> => {
    try {
      const response = await axiosClient.get(onboardingRoutes.getSpecialities,{params:{categoryId}});
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
  getSuggestedSkills:async (specialities:string[]):Promise<any>=>{
    try {

      const response = await axiosClient.get(onboardingRoutes.getSuggestedSkills,{params:{specialities}});
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
};
