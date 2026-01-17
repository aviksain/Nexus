import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import { RootState } from "../../redux/store";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { updateAccountAPI } from "../../api/channel";
import toast from "react-hot-toast";
import { updateemail, updatefullname } from "../../redux/slices/channelSlice";
import { saveUserData } from "../../redux/slices/authSlice";

type FormData = {
  fullname: string;
  email: string;
};

function EditPersonalInfo() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      fullname: userData?.fullname || "abcd",
      email: userData?.email || "abcd@gmail.com",
    },
  });

  const changeDetails = async (data: FormData) => {
    try {
      const res = await updateAccountAPI(data);
      dispatch(updatefullname(res.fullname));
      dispatch(updateemail(res.email));
      dispatch(saveUserData(res));
      if (res) toast.success("Account Details Updated");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const reset = (e: any) => {
    e.preventDefault();
    setValue("fullname", userData?.fullname);
    setValue("email", userData?.email);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-y-4 py-4">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <h5 className="font-semibold">Personal Info</h5>
          <p className="text-gray-300">
            Update your photo and personal details.
          </p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/3">
          <form onSubmit={handleSubmit(changeDetails)}>
            <div className="rounded-lg border">
              <div className="flex flex-wrap gap-y-4 p-4">
                <div className="w-full">
                  <label htmlFor="firstname" className="mb-1 inline-block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="firstname"
                    placeholder="Enter first name"
                    {...register("fullname")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="lastname" className="mb-1 inline-block">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                      <Mail />
                    </div>
                    <input
                      type="email"
                      className="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                      id="lastname"
                      placeholder="Enter email address"
                      {...register("email")}
                    />
                  </div>
                  <p className="mt-0.5 text-sm text-gray-300">
                    Your email should be unique.
                  </p>
                </div>
              </div>
              <div className="border border-gray-300"></div>
              <div className="flex items-center justify-end gap-4 p-4">
                <Button bgColor="bg-[#64748B]" onClick={(e) => reset(e)}>
                  Reset
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPersonalInfo;
