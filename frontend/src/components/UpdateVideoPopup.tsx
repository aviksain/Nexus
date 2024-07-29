import { useState } from "react";
import { deleteVideoAPI } from "../api/videos";
import toast from "react-hot-toast";
import ProcessingVideoPopup from "./ProcessingVideoPopup";
import { useDispatch, useSelector } from "react-redux";
import { deleteAVideo } from "../redux/slices/videosSlice";
import { X } from "lucide-react";
import { deleteChannelVideo, insertAVideo } from "../redux/slices/dashboardSlice";
import { channelVideosType } from "../Types/dashboard";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, InputImage } from ".";
import { updateVideoAPI } from "../api/dashboard";
import { createConfetti } from "../utils/confetti";

type FormData = {
  title: string;
  description: string;
  thumbnail: FileList;
};

function UpdateVideoPopup({ id, show, setShow }: any) {
  if (!show) {
    return null;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const channelVideos: channelVideosType[] = useSelector(
    (state: any) => state.dashboard.channelVideos
  );
  const currVideoDetails = channelVideos.find(
    (video) => video._id === id
  ) as channelVideosType;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: currVideoDetails?.title || "",
      description: currVideoDetails?.description || "",
      thumbnail: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await updateVideoAPI(id,data);
      dispatch(deleteChannelVideo(id));
      dispatch(insertAVideo(response));
      
      toast.success("Video updated successfully");
      createConfetti();
    } catch (error: any) {
      console.error(error);

      toast.error("Error in updating video")
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  return (
    <>
      {loading ? (
        <ProcessingVideoPopup message={"Updating"} />
      ) : (
        <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
          <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-semibold">
                Edit Video
                <span className="block text-sm text-gray-300">
                  Share where you've worked on your profile.
                </span>
              </h2>
              <button onClick={() => setShow(false)} className="h-6 w-6">
                <X />
              </button>
            </div>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail
              </label>
              <InputImage
                src={currVideoDetails.thumbnail}
                control={control}
                accept="image/*," name="thumbnail"
              />
              {errors.thumbnail && (
                <span className="text-red-500">{errors.thumbnail.message}</span>
              )}
              <div className="mb-6 flex flex-col gap-y-4">
                <div className="w-full">
                  <label htmlFor="title" className="mb-1 inline-block">
                    Title
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter video title"
                    {...register("title")}
                  />
                  {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                  )}
                </div>
                <div className="w-full">
                  <label htmlFor="description" className="mb-1 inline-block">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="h-40 w-full resize-none border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                    placeholder="Enter video description"
                    {...register("description")}
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShow(false)}
                  className="border px-4 py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateVideoPopup;
