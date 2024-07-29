import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const getUserTweetsAPI = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/tweets/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.log("getUserTweetsAPI :: error :: " + error);
  }
};

const createTweetAPI = async (content: string) => {
  try {
    const response = await axiosInstance.post("/tweets",{ content });
    return response.data.data;
  } catch (error:any) {
    console.log("createTweetAPI :: error :: " + error);
  }
};

const updateTweetAPI = async (tweetId: string,content:string) => {
  try {
    const response = await axiosInstance.patch(`/tweets/${tweetId}`,{content});
    return response.data.data;
  } catch (error) {
    console.log("updateTweetAPI :: error :: " + error);
  }
};

const deleteTweetAPI = async (tweetId: string) => {
  try {
    const response = await axiosInstance.delete(`/tweets/${tweetId}`);
    return response.data.data;
  } catch (error) {
    console.log("deleteTweetAPI :: error :: " + error);
  }
};

export { 
  getUserTweetsAPI, 
  createTweetAPI, 
  updateTweetAPI, 
  deleteTweetAPI 
};
