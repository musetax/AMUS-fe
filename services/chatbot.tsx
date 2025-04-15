
import axiosInstance from "@/utilities/axios";
import { API_URL } from "@/utilities/config";

export const sendQuery = async (query:string) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/query`, { query });
      return response.data;
    } catch (error : any) {
      throw error.response?.data || { message: error.message };
    }
  };

  export const sendMessagetax = async (data:any,session_id:string) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/api/chat/${session_id}/message`, { message:data });
      return response.data;
    } catch (error : any) {
      throw error.response?.data || { message: error.message };
    }
  };
  export const authenticate = async (data:any) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/api/chat/checkboost/start`, { ...data });
      return response.data;
    } catch (error : any) {
      throw error.response?.data || { message: error.message };
    }
  };
  export const taxProfile = async (taxdata:any,session_id:string) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/api/tax-profile/checkboost/`+session_id, { ...taxdata });
      return response.data;
    } catch (error : any) {
      throw error.response?.data || { message: error.message };
    }
  };