import { axiosClient } from "../axiosClient";
import adminEndPoint from "@/types/endPoints/adminEndPoints";
import {
  IcategoryData,
  ISkills,
  ISpeaciality,
} from "@/types/interfaces/IAdmin";
import axios from "axios";

const AdminActionApi = {
  createCategory: async (data: IcategoryData) => {
    try {
      const response = await axiosClient.post(
        adminEndPoint.adminCreateCategory,
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

  updateCategory: async (data: IcategoryData) => {
    try {
      const response = await axiosClient.patch(
        adminEndPoint.adminUpdateCategory,
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
  getCategories: async (
    search: string = "",
    page: number = 1,
    limit: number = 10,
    mode: string = "detailed"
  ) => {
    try {
      const response = await axiosClient.get(adminEndPoint.adminGetCategories, {
        params: {
          search,
          page,
          limit,
          mode,
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

  createSpeciality: async (data: IcategoryData) => {
    try {
      const response = await axiosClient.post(
        adminEndPoint.adminCreateSpeciality,
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

  updateSpeciality: async (data: ISpeaciality) => {
    try {
      const response = await axiosClient.patch(
        adminEndPoint.adminUpdateSpeciality,
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

  getSpecialities: async (
    search: string = "",
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any>,
    mode: string = "detailed"
  )=> {
    try {
      const response = await axiosClient.get(adminEndPoint.adminGetSpeciality, {
        params: {
          search,
          page,
          limit,
          filter,
          mode,
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

  async getUserStats() {
    try {
      const response = await axiosClient.get(adminEndPoint.adminGetUserStats);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      } else {
        return "Unexpected error";
      }
    }
  },

  async getUsers(
    search: string = "",
    page: number = 1,
    limit: number = 10,
    filters: { role?: string; status?: string }
  ) {
    try {
      const response = await axiosClient.get(adminEndPoint.adminUser, {
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
  createSkill: async (data: ISkills) => {
    try {
      const response = await axiosClient.post(
        adminEndPoint.adminCreateSkills,
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
  getSkills: async (
    search: string = "",
    page: number = 1,
    limit: number = 10,
    // filter: Record<string, any>,
    mode: string = "detailed"
  ) => {
    try {
      const response = await axiosClient.get(adminEndPoint.adminGetSkills, {
        params: {
          search,
          page,
          limit,
          // filter,
          mode,
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
  updateSkill: async (data: ISkills) => {
    try {
      const response = await axiosClient.patch(
        adminEndPoint.adminUpdateSkill,
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
  getUserDetail: async (id: string) => {
    try {
      const response = await axiosClient.get(adminEndPoint.adminUserDetail, {
        params: { id },
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
  updateUserStatus: async (
    id: string,
    role: "client" | "freelancer",
    status: "block" | "unblock"
  ) => {
    try {
      const response = await axiosClient.patch(
        adminEndPoint.adminUserStatusUpdate,
        { id, role, status }
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

export default AdminActionApi;
