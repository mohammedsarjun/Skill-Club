
import clientRouterEndPoints from "@/types/endPoints/clientEndPoint";
import { axiosClient } from "../axiosClient";
import { ClientProfileData } from "@/types/interfaces/IClient";
export const clientActionApi = {
  async getClientData() {
    try {
    
      const response = await axiosClient.get(clientRouterEndPoints.me);

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async updateClientData(data:Partial<ClientProfileData>){
      try {
   
      const response = await axiosClient.patch(clientRouterEndPoints.updateClient,data);

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
};
