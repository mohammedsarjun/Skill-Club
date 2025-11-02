import clientRouterEndPoints from "@/types/endPoints/clientEndPoint";
import { axiosClient } from "../axiosClient";
import { ClientProfileData, JobData } from "@/types/interfaces/IClient";
import axios from "axios";
import { IJobQueryParams } from "@/types/interfaces/IJob";
export const clientActionApi = {
  async getClientData() {
    try {
      const response = await axiosClient.get(clientRouterEndPoints.me);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

  async updateClientData(data: Partial<ClientProfileData>) {
    try {
      const response = await axiosClient.patch(
        clientRouterEndPoints.updateClient,
        data
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
        clientRouterEndPoints.getAllCategories
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
        clientRouterEndPoints.getSpecialitiesWithSkills,
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

  async createJob(jobData: JobData) {
    try {
      const response = await axiosClient.post(clientRouterEndPoints.createJob, {
        jobData,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

  async getAllJobs(
    search: string = "",
    page: number = 1,
    limit: number = 10,
    filters: Pick<IJobQueryParams, "filters">
  ) {
    try {
      const response = await axiosClient.get(clientRouterEndPoints.getAllJobs, {
        params: {
          search,
          page,
          limit,
          filters,
        },
      });

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
      const response = await axiosClient.get(clientRouterEndPoints.getJobDetail(jobId));
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

     async updateJobDetail(jobId: string,jobData:JobData) {
      try {
    
      const response = await axiosClient.put(clientRouterEndPoints.updateJobDetail(jobId), {jobData});
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
