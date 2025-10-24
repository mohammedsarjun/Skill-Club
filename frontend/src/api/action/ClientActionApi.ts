import clientRouterEndPoints from "@/types/endPoints/clientEndPoint";
import { axiosClient } from "../axiosClient";
import { ClientProfileData } from "@/types/interfaces/IClient";
import axios from "axios";
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
};
