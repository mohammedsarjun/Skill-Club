import freelancerRouterEndPoints from "@/types/endPoints/freelancerEndPoint";
import { axiosClient } from "../axiosClient";
import { updateFreelancerData } from "@/store/slices/freelancerSlice";
import axios from "axios";
import {
  IFreelancerEducation,
  IFreelancerLanguage,
  IFreelancerWorkHistory,
  IHourlyRate,
  IProfessionalRole,
} from "@/types/interfaces/IFreelancerData";
import { FreelancerJobFilters } from "@/types/interfaces/IJob";

export const freelancerActionApi = {
  async getFreelancerData() {
    try {
      const response = await axiosClient.get(freelancerRouterEndPoints.me);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

  async updateHourlyRate(hourlyRate: IHourlyRate) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateHourlyRate,
        { hourlyRate }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

  async updateProfessionalRole(professionalRole: IProfessionalRole) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateProfessionalRole,
        { professionalRole }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },
  async updateFreelancerLanguage(language: IFreelancerLanguage) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateLanguage,
        { language }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  },
  async deleteFreelancerLanguage(language: string) {
    try {
      const response = await axiosClient.delete(
        freelancerRouterEndPoints.deleteLanguage,
        { params: { language } }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  },

  async deleteFreelancerEducation(educationId: string) {
    try {
      const response = await axiosClient.delete(
        freelancerRouterEndPoints.deleteEducation,
        { params: { educationId } }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  },

  async deleteFreelancerPortfolio(portfolioId: string) {
    try {
      const response = await axiosClient.delete(
        freelancerRouterEndPoints.deletePortfolio,
        { params: { portfolioId } }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  },
  async deleteWorkHistory(workHistoryId: string) {
    try {
      const response = await axiosClient.delete(
        freelancerRouterEndPoints.deleteWorkHistory,
        { params: { workHistoryId } }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  },

  async addFreelancerEducation(education: IFreelancerEducation) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateEducation,
        { education }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  },
  async addFreelancerWorkHistory(workHistory: IFreelancerWorkHistory) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateWorkHistory,
        { workHistory }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        return { message: "An unexpected error occurred" };
      }
    }
  },

  async updateFreelancerDescription(description: Record<string, any>) {
    try {
      const response = await axiosClient.patch(
        freelancerRouterEndPoints.updateDescription,
        { description } // ✅ Correct
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },
  async getPortFolio() {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getPortfolio
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },
  async getPortfolioDetails(id: string) {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getPortfolioDetails,
        { params: { portfolioId: id } }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

  async getAllCategories() {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getAllCategories
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },
  async getSpecialitiesWithSkills(selectedCategory: string) {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getSpecialitiesWithSkills,
        { params: { selectedCategory } }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

  async getJobs(jobFilters: FreelancerJobFilters) {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getJobs,
        { params: { jobFilters } }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

    async getJobDetail(jobId: string) {
    try {
      const response = await axiosClient.get(
        freelancerRouterEndPoints.getJobDetail(jobId)
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },
};
