import { Link, useNavigate } from "react-router-dom";
import { Button, CheckBox, Input } from "../components/index";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveUserData } from "../redux/slices/authSlice";
import { loginAPI } from "../api/auth";
import {NavbarContainer} from ".";
import { createConfetti } from "../utils/confetti";
import { LoaderCircle } from "lucide-react";

type formData = {
  identifier: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // let userData = useSelector((state:any) => state.auth.userData);

  const onSubmit = async (data: formData) => {
    setLoading(true);
    try {
      const response = await loginAPI(data);
      dispatch(saveUserData(response));
      navigate('/');
      createConfetti();
      console.log(response);
    } catch (error) {
      console.log(error);
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
                  Log in
                </h1>
                <p className="text-xs text-slate-400">
                  Before we start, please log into your account
                </p>
              </div>
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-14 flex w-full flex-col items-start justify-start gap-4">
                  <div className="flex w-full flex-col items-start justify-start gap-2">
                    <label className="text-xs text-slate-200">Username</label>
                    <Input
                      type="text"
                      placeholder="Enter your username/email"
                      {...register("identifier", {
                        required: "username/email is required",
                      })}
                    />
                    {errors.identifier && (
                      <span className="text-red-500">
                        {errors.identifier.message}
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
                  <CheckBox label="Remenber me" />
                  <Button type="submit" disabled={loading}> 
                    {loading ? (<LoaderCircle className="animate-spin"/>) :("Log in")} 
                  </Button>
                  <p className="my-14 text-sm font-light text-white">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="mx-1 cursor-pointer font-bold hover:underline"
                    >
                      Create an account
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

export default Login;
