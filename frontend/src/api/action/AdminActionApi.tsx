import { axiosClient } from "../axiosClient";
import adminEndPoint from "@/types/endPoints/adminEndPoints";
import { IcategoryData, ISpeaciality } from "@/types/interfaces/admin/IAdmin";

const AdminActionApi = {
  createCategory: async (data: IcategoryData): Promise<any> => {
    try {
      const response = await axiosClient.post(
        adminEndPoint.adminCreateCategory,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  updateCategory: async (data: IcategoryData): Promise<any> => {
    try {
      const response = await axiosClient.patch(
        adminEndPoint.adminUpdateCategory,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
  getCategories: async (
    search: string = "",
    page: number = 1,
    limit: number = 10,
    mode: string = "detailed"
  ): Promise<any> => {
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
    } catch (error: any) {
      return error.response.data;
    }
  },

  createSpeciality: async (data: IcategoryData): Promise<any> => {
    try {
      const response = await axiosClient.post(
        adminEndPoint.adminCreateSpeciality,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  updateSpeciality: async (data: ISpeaciality): Promise<any> => {
    try {
      const response = await axiosClient.patch(
        adminEndPoint.adminUpdateSpeciality,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  getSpecialities: async (
    search: string = "",
    page: number = 1,
    limit: number = 10,
    mode: string = "detailed"
  ): Promise<any> => {
    try {
      const response = await axiosClient.get(adminEndPoint.adminGetSpeciality, {
        params: {
          search,
          page,
          limit,
          mode,
        },
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async getUserStats() {
    try {
      const response = await axiosClient.get(adminEndPoint.adminGetUserStats);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },



  async getUsers(search:string="", page:number=1, limit:number=10, filters:{ role?: string; status?: string }) {
    try {
      const response = await axiosClient.get(adminEndPoint.adminUser,{
        params:{
          search,
          page,
          limit,
          filters
        }
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
};

export default AdminActionApi;
