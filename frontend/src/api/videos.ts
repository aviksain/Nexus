import axiosInstance from "../utils/axiosInstance";

const getAllVideosAPI = async ({
  userId,
  sortBy = "asc",
  sortType = "createdAt",
  query,
  page,
  limit,
}: any) => {
  try {
    const params: any = {
      page,
      limit,
      sortBy,
      sortType,
      userId,
      query
    };

    Object.keys(params).forEach(key => params[key] === undefined || params[key] === null ? delete params[key] : {});

    const response = await axiosInstance.get("/videos/", {
      params,
    });

    return response?.data?.data?.docs;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};


const getVideoByIdAPI = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/videos/${id}`);
    console.log(res);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const publishVideoAPI = async (data: any) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);

    const response = await axiosInstance.post("/videos", formData);

    return response.data.data;
  } catch (err) {
    console.log("API :: publishVideo :: Error :: ", err);
  }
};

const deleteVideoAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/videos/${id}`);
    console.log(response);
  } catch (error) {
    deleteVideoAPI(id);
  }
};

export { getAllVideosAPI, getVideoByIdAPI, publishVideoAPI, deleteVideoAPI };
