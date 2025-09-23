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

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}
export const authApi = {
  signUp: async (data: SignUpData): Promise<any> => {
    try {

      const response = await axiosClient.post(
        authenticationRoutes.userSignUp,
        data
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
    login: async (data: LoginData): Promise<any> => {
    try {

      const response = await axiosClient.post(
        authenticationRoutes.userLogin,
        data
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
    
  },
  forgotPassword: async (email:string): Promise<any> => {
    try {

      const response = await axiosClient.post(
        authenticationRoutes.forgotPassword,
        {email}
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
    
  },  resetPassword: async (resetData:{token:string,password:string}): Promise<any> => {
    try {
      const response = await axiosClient.post(
        authenticationRoutes.resetPassword ,
        {resetData}
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
    
  },

  createOtp: async (email: string, userId: string | undefined, purpose: string): Promise<any> => {
    try {

      const response = await axiosClient.post(authenticationRoutes.createOtp, { email, purpose });

      sessionStorage.setItem("otpEmail", response.data.data.email)
      sessionStorage.setItem("otpExpiry", response.data.data.expiresAt)
      if (userId) {
        sessionStorage.setItem("userId", userId)
      }


      return response.data;
    } catch (error: any) {
      console.log(error)
      // return error.response.data;
    }
  },



  verifyOtp: async (email: string, otp: string,userId?:string): Promise<any> => {
    try {
      const response = await axiosClient.post(authenticationRoutes.verifyOtp, { email, otp ,userId});

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }


};
