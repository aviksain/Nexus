import axiosInstance from "../utils/axiosInstance";

const toggleTweetLikeAPI = async (tweetId:string) => {
  try {
    const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
    return response.data.data;
  } catch (error) {
    console.log("ToggleTweetLikeAPI :: error :: "+error);
  }
}

const toggleVideoLikeAPI = async (videoId:string) => {
  try {
    const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
    return response.data.data;
  } catch (error) {
    console.log("ToggleVideoLikeAPI :: error :: "+error);
  }
}

const toggleCommentLikeAPI = async (commentId:string) => {
  try {
    const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
    return response.data.data;
  } catch (error) {
    console.log("ToggleCommentLikeAPI :: error :: "+error);
  }
}

const getLikeVideoAPI = async () => {
  try {
    const response = await axiosInstance.get("/likes/videos");
    return response.data.data;
  } catch (error:any) {
    console.log(error.message);
    
  }
}

export {
  toggleCommentLikeAPI,
  toggleVideoLikeAPI,
  toggleTweetLikeAPI,
  getLikeVideoAPI
}