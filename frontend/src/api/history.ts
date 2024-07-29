import axiosInstance from "../utils/axiosInstance";

export const getwatchHistoryAPI = async () => {
  try {
    const response = await axiosInstance.get('/users/history');
    return response.data.data;
  } catch (err:any) {
    console.log(err)
  }
}