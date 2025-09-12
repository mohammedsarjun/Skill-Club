import { axiosClient } from "./axiosClient";
import authenticationRoutes from "@/types/endPoints/authEndPoints";
export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | string;
  password: string;
  agreement: string | boolean;
}

export const authApi = {
  signUp: async (data: SignUpData): Promise<any> => {
    try {
   
      const response = await axiosClient.post(
        authenticationRoutes.userSignUp,
        data
      );

      localStorage.setItem("otpEmail",response.data.data.email)
      localStorage.setItem("otpExpiry",response.data.data.expiresAt)

      return response.data;
    } catch (error) {}
  },
};
