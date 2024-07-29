import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const registerAPI = async (data: any) => {
  try {
    const formData = new FormData();

    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);

    if (data.coverImage) {
      formData.append("coverImage", data.coverImage[0]);
    }

    const response = await axiosInstance.post("/users/register", formData);

    return response.data.data;
  } catch (err) {
    console.log("API :: Register :: Error :: ", err);
  }
};

const loginAPI = async (data: any) => {
  
  function isEmail(input: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  let formData: any = {};
  if(!isEmail(data.identifier)) {
    formData.username = data.identifier;
  }
  else {
    formData.email = data.identifier;
  }

  formData.password = data.password;

  try {
    const response = await axiosInstance.post("/users/login", formData);
    return response.data.data.user;
  } catch (err) {
    console.log("API :: Login :: Error :: ", err);
  }
};

const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post('/users/logout');
    if(response) toast.success("Logout Succesfully");
    return response;
  }
  catch (err) {
    console.log("LogoutAPI :: Error :: ", err);
  }
  
};

const getcurrentUserAPI = async () => {
  try {
    const response = await axiosInstance.get('/users/current-user');
    return response.data.data;
  } catch (error) {
    console.log("API :: GetCurrentUser :: " + error);
  }
};


export { registerAPI, loginAPI, logoutAPI, getcurrentUserAPI };
