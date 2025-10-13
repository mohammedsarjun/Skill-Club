import freelancerRouterEndPoints from "@/types/endPoints/freelancerEndPoint";
import { axiosClient } from "../axiosClient";
import { updateFreelancerData } from "@/store/slices/freelancerSlice";

export const freelancerActionApi = {
  async getFreelancerData() {
    try {
      const response = await axiosClient.get(freelancerRouterEndPoints.me);

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async updateFreelancerLanguage(language: Record<string, any>) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateLanguage,
        { language }
      );
      return response.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
  async deleteFreelancerLanguage(language: string) {
    try {
      const response = await axiosClient.delete(
        freelancerRouterEndPoints.deleteLanguage,
        { params: { language } } // ✅ Correct
      );

      return response.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },

  async updateFreelancerDescription(description: Record<string, any>) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateDescription,
        { description } // ✅ Correct
      );

      return response.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },

  // async updateFreelancerProfessionalRole(professionalRole){}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                : Record<string, any>) {
  //   try {
  //     const response = await axiosClient.post(
  //       freelancerRouterEndPoints.updateProfessionalRole,
  //       { portfolioData }
  //     );
  //     return response.data;
  //   } catch (error: any) {
  //     return error?.response?.data;
  //   }
  // },

  async createPortFolio(portfolioData: Record<string, any>) {
    try {
      const response = await axiosClient.post(
        freelancerRouterEndPoints.createPortfolio,
        { portfolioData }
      );
      return response.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
  async getPortFolio() {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getPortfolio
      );
      return response.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
  async getPortfolioDetails(id: string) {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getPortfolioDetails,
        { params: { portfolioId: id } }
      );
      return response.data;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
};
