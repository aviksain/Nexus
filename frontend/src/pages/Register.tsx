import { Link, useNavigate } from "react-router-dom";
import { Button, CheckBox, Input, InputImage } from "../components/index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAPI } from "../api/auth";
import { NavbarContainer } from ".";
import { saveUserData } from "../redux/slices/authSlice";
import { createConfetti } from "../utils/confetti";
import { LoaderCircle } from "lucide-react";

type FormData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: FileList;
  coverImage: FileList;
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const userData = useSelector((state:any) => state.auth.userData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      avatar: undefined,
      coverImage: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await registerAPI(data);
      dispatch(saveUserData(response));
      console.log(response);
      if (response) {
        createConfetti();
        navigate("/login");
      }
    } catch (error: any) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarContainer>
        <div className={`${loading ? "animate-pulse" : ""} min-h-screen bg-[#121212]`}>
          <div className="mx-auto flex w-full items-stretch justify-between gap-10">
            <div className="mt-20 flex w-full flex-col items-start justify-start p-6 md:w-1/2 lg:px-10">
              <div className="w-full">
                <h1 className="mb-2 text-5xl font-extrabold text-white">
                  Register
                </h1>
                <p className="text-xs text-slate-400">
                  Before we start, please create your account
                </p>
              </div>
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-14 flex w-full flex-col items-start justify-start gap-4">
                  <div className="flex w-full flex-col items-start justify-start gap-2">
                    <label className="text-xs text-slate-200">Full name</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("fullname", {
                        required: "username is required",
                      })}
                    />
                    {errors.fullname && (
                      <span className="text-red-500">
                        {errors.fullname.message}
                      </span>
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2">
                    <label className="text-xs text-slate-200">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your Email"
                      {...register("email", { required: "email is required" })}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2">
                    <label className="text-xs text-slate-200">Username</label>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...register("username", {
                        required: "username is required",
                      })}
                    />
                    {errors.username && (
                      <span className="text-red-500">
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2">
                    <label className="text-xs text-slate-200">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...register("password", {
                        required: "password is required",
                      })}
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-200">Select your avatar</p>
                  <div className="w-full text-white text-center">
                    <InputImage
                      src={
                        "https://c1.wallpaperflare.com/preview/353/1007/614/cms-wordpress-content-management-system-editorial.jpg"
                      }
                      control={control}
                      accept="image/*,"
                      name="avatar"
                    />
                  </div>
                  {errors.avatar && (
                    <span className="text-red-500">
                      {errors.avatar.message}
                    </span>
                  )}
                  <p className="text-xs text-slate-200">
                    Select your avatar cover image
                  </p>
                  <div className="w-full text-white text-center">
                    <InputImage
                      src={
                        "https://c1.wallpaperflare.com/preview/353/1007/614/cms-wordpress-content-management-system-editorial.jpg"
                      }
                      control={control}
                      accept="image/*,"
                      name="coverImage"
                    />
                  </div>
                  {errors.coverImage && (
                    <span className="text-red-500">
                      {errors.coverImage.message}
                    </span>
                  )}
                  <div className="flex">
                    <CheckBox label="I agree to the" />
                    <Link
                      to="/terms-and-conditions"
                      className="text-white cursor-pointer font-bold hover:underline"
                    >
                      terms and conditions
                    </Link>
                  </div>
                  <Button type="submit"> 
                    {loading ? (<LoaderCircle className="animate-spin"/>) :("Create Account")} 
                  </Button>
                  <p className="my-14 text-sm font-light text-white">
                    Already registered?
                    <Link
                      to="/login"
                      className="mx-1 cursor-pointer font-bold hover:underline"
                    >
                      Sign in to your account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="fixed right-0 z-20 hidden h-screen w-1/2 md:block">
              <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="register_image"
              />
            </div>
          </div>
        </div>
      </NavbarContainer>
    </>
  );
}

export default Register;
