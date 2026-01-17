import { Button } from "../../components";
import { useForm } from "react-hook-form";
import { changePasswordAPI } from "../../api/channel";
import toast from "react-hot-toast";

type FormData = {
  oldPassword: string;
  newPassword: string;
  rewritePassword: string;
};

function EditPassword() {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      rewritePassword: "",
    },
  });

  const changeDetails = async (data: FormData) => {
    try {
      if (data.newPassword !== data.rewritePassword) {
        toast.error("Passwords did not matched");
        return;
      }
      await changePasswordAPI(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const reset = (e: any) => {
    e.preventDefault();
    setValue("oldPassword", "",);
    setValue("newPassword", "");
    setValue("rewritePassword", "",);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-y-4 py-4">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <h5 className="font-semibold">Password</h5>
          <p className="text-gray-300">
            Please enter your current password to change your password.
          </p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/3">
          <form onSubmit={handleSubmit(changeDetails)}>
            <div className="rounded-lg border">
              <div className="flex flex-wrap gap-y-4 p-4">
                <div className="w-full">
                  <label className="mb-1 inline-block" htmlFor="old-pwd">
                    Current password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="old-pwd"
                    placeholder="Current password"
                    {...register("oldPassword")}
                  />
                </div>
                <div className="w-full">
                  <label className="mb-1 inline-block" htmlFor="new-pwd">
                    New password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="new-pwd"
                    placeholder="New password"
                    minLength={8}
                    {...register("newPassword", {
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />
                  <p className="mt-0.5 text-sm text-gray-300">
                    Your new password must be more than 8 characters.
                  </p>
                </div>
                <div className="w-full">
                  <label className="mb-1 inline-block" htmlFor="cnfrm-pwd">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="cnfrm-pwd"
                    placeholder="Confirm password"
                    minLength={8}
                    {...register("rewritePassword", {
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />
                </div>
              </div>
              <div className="border border-gray-300"></div>
              <div className="flex items-center justify-end gap-4 p-4">
                <Button bgColor="bg-[#64748B]" onClick={(e) => reset(e)}>
                  Reset
                </Button>
                <Button type="submit">Update Password</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPassword;
