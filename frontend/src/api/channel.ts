import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const getUserChannelProfileAPI = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/users/c/${username}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const updateAccountAPI = async (data:any) => {
  try {
    const response = await axiosInstance.patch('/users/update-account',data);
    return response.data.data;
  } catch (error:any) {
    toast.error(error.message);
    console.log("UpdateAccountAPI :: Error :: "+ error);
  }
};

const changePasswordAPI = async (data: any) => {
  try {
    const response = await axiosInstance.post('/users/change-password', {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    });

    if (response.status === 200) {
      toast.success("Password Changed");
    } else {
      toast.error(`Unexpected response status: ${response.status}`);
    }
  } catch (error: any) {
    toast.error('An unexpected error occurred.');
  }
};


const updateAvatarAPI = async (file: File) => {
  try {
    const response = await axiosInstance.patch(
      "/users/avatar",
      { avatar: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Avatar :: Error :: ", error);
    return undefined;
  }
};

const updateCoverImageAPI = async (file: File) => {
  try {
    const response = await axiosInstance.patch(
      "/users/cover-image",
      { coverImage: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("updateCoverImage :: Error :: ", error);
    return undefined;
  }
};

const getChannelInfo = async () => {};

export { getUserChannelProfileAPI, updateCoverImageAPI, updateAvatarAPI,updateAccountAPI, changePasswordAPI};
