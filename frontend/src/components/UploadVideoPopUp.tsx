import { useForm } from "react-hook-form";
import { Button, InputImage } from "./index";
import { publishVideoAPI } from "../api/videos";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { insertAVideo } from "../redux/slices/dashboardSlice";
import { ProcessingVideoPopup } from "./index";
import toast from "react-hot-toast";
import { createConfetti } from "../utils/confetti";

type data = {
  show: boolean;
  changeshow: () => void;
};

type FormData = {
  title: string;
  description: string;
  videoFile: FileList;
  thumbnail: FileList;
};

const UploadVideoPopUp = ({ show, changeshow }: data) => {
  if (!show) {
    return null;
  }

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      videoFile: undefined,
      thumbnail: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await publishVideoAPI(data);

      dispatch(insertAVideo(response));

      toast.success("Video uploded successfully");
      createConfetti();
      console.log(response);
    } catch (error) {
      toast.success("Error in uploading video");
      console.log(error);
    } finally {
      changeshow();
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      {loading ? (
        <ProcessingVideoPopup />
      ) : (
        <div className="absolute mt-14 inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
          <div className="h-full mt-[30px] overflow-auto border bg-[#121212]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-semibold">Upload Videos</h2>
                <div className="flex justify-between">
                  <Button bgColor="bg-slate-500 mr-4" onClick={changeshow}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </div>
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
                <div className="w-full  text-center">
                  <p className="bold italic text-xl text-white">
                    Select your video file<sup className="text-[red]">*</sup>
                  </p>
                  <p className="text-gray-400">
                    Your videos will be private untill you publish them.
                  </p>
                  <InputImage
                    src={
                      "http://res.cloudinary.com/deenvdivb/video/upload/v1712732877/cnzjneaha7tmwcfpeeak.mp4"
                    }
                    control={control}
                    accept="video/mp4,video/webm,video/mkv,video/avi,video/mov,video/flv,video/ogg,video/3gp"
                    name="videoFile"
                    fileType="video"
                    errors={errors}
                  />
                </div>
                <div className="w-full text-center">
                  <p className="bold italic text-xl text-white">
                    Select your Thumbnail <sup className="text-[red]">*</sup>
                  </p>
                  <InputImage
                    src={
                      "https://c1.wallpaperflare.com/preview/353/1007/614/cms-wordpress-content-management-system-editorial.jpg"
                    }
                    control={control}
                    accept="image/*,"
                    name="thumbnail"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="title" className="mb-1 inline-block">
                    Title<sup className="text-[red]">*</sup>
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="w-full border bg-transparent px-2 py-1 outline-none"
                    {...register("title", { required: "Title is required" })}
                  />
                </div>
                {errors.title && (
                  <span className="text-red-500">{errors.title.message}</span>
                )}
                <div className="w-full">
                  <label htmlFor="description" className="mb-1 inline-block">
                    Description<sup className="text-[red]">*</sup>
                  </label>
                  <textarea
                    id="description"
                    className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></textarea>
                </div>
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadVideoPopUp;
