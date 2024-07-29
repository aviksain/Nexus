import axiosInstance from "../utils/axiosInstance";

const getChannelStatsAPI = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/stats");
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

const getChannelVideosAPI = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/videos");
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

const togglePublishAPI = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/videos/toggle/publish/${id}`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const updateVideoAPI = async (id: string, data: any) => {
  const formData = new FormData();

  if (data.title) {
    formData.append("title", data.title);
  }
  if (data.description) {
    formData.append("description", data.description);
  }
  if (data.thumbnail) {
    formData.append("thumbnail", data.thumbnail[0]);
  }

  try {
    const response = await axiosInstance.patch(`/videos/${id}`,formData);
    return response.data.data;
  } catch (error) {
    console.log("updateVideoApi :: error :: " + error);
  }
};

export {
  getChannelStatsAPI,
  getChannelVideosAPI,
  togglePublishAPI,
  updateVideoAPI,
};
