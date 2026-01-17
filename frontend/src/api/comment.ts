import axiosInstance from "../utils/axiosInstance";

const getVideoCommentsAPI = async(videoId:string) => {
  try { 
    const response = await axiosInstance.get(`/comments/${videoId}`);
    return response.data.data;
  } catch (error) {
    console.log("getVideoCommentsAPI :: error :: "+error);
  }
}

const addCommentAPI = async(videoId:string, content:string) => {
  try { 
    const response = await axiosInstance.post(`/comments/${videoId}`,{content});
    return response.data.data;
  } catch (error) {
    console.log("getVideoCommentsAPI :: error :: "+error);
  }
}

const updateCommentAPI = async(commentId:string, content:string) => {
  try { 
    const response = await axiosInstance.patch(`comments/c/${commentId}`,{content});
    return response.data.data;
  } catch (error) {
    console.log("getVideoCommentsAPI :: error :: "+error);
  }
}

const deleteCommentAPI = async(commentId:string) => {
  try { 
    const response = await axiosInstance.delete(`/comments/c/${commentId}`);
    return response.data.data;
  } catch (error) {
    console.log("getVideoCommentsAPI :: error :: "+error);
  }
}

export {
  getVideoCommentsAPI,
  addCommentAPI,
  updateCommentAPI,
  deleteCommentAPI
}