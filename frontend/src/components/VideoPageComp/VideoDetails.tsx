import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../utils/calculateTime";
import {
  FolderPlus,
  Pencil,
  ThumbsUp,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toggleSubscriptionAPI } from "../../api/subscriptions";
import toast from "react-hot-toast";
import { toggleSubscription as toggleSubscriptionRedux, toggleLike as toggleLikeRedux } from "../../redux/slices/videosSlice";
import { Button } from "..";
import { toggleVideoLikeAPI } from "../../api/like";


function VideoDetails() {
  const video = useSelector((state: any) => state.video.video);
  const userData = useSelector((state: any) => state.auth.userData);
  const isSubscribed = useSelector((state: any) => state.video.isSubscribed);

  const dispatch = useDispatch();
  const toggleSubscription = async () => {
    try {
      const response = await toggleSubscriptionAPI(video?.owner._id);
      console.log(response);
      dispatch(toggleSubscriptionRedux());
      if (response)
        toast.success(
          `${!isSubscribed ? "Subscribed" : "Unsubscribed"}  to ${
            video.owner.fullname
          }`
        );
    } catch (error: any) {
      toast.error(error.message);
      console.log("ToggleSubscription :: Error :: ", error);
    }
  };

  const toggleLike = async (videoId: string) => {
    try {
      const res = await toggleVideoLikeAPI(videoId);
      if (res) {
        toast.success("Video Like Toggled");
        dispatch(toggleLikeRedux());
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  if (!video || !video.owner) {
    return <div>Loading...</div>; // Or handle this case appropriately
  }

  return (
    <>
      <div
        className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
        role="button"
      >
        <div className="flex flex-wrap gap-y-2">
          <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
            <h1 className="text-lg font-bold">{video?.title}</h1>
            <p className="flex text-sm text-gray-200">
              {video?.views} Views · {timeAgo(video?.createdAt)}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
            <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
              <div className="flex overflow-hidden rounded-lg border">
                <button
                  className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]
                  transition-transform transform hover:scale-110"
                  data-like={video?.likes}
                  data-like-alt={video?.likes}
                  onClick={() => toggleLike(video._id)}
                >
                    {video?.isLiked ? (
                      <ThumbsUp color="#ae7aff" fill="#ae7aff" />
                    ) : (
                      <ThumbsUp/>
                    )}
                </button>
              </div>
              <div className="relative block">
                <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                  <span className="inline-block w-5">
                    <FolderPlus />
                  </span>
                  Save
                </button>
                <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                  <h3 className="mb-4 text-center text-lg font-semibold">
                    Save to playlist
                  </h3>
                  <div className="flex flex-col">
                    <label
                      htmlFor="playlist-name"
                      className="mb-1 inline-block cursor-pointer"
                    >
                      Name
                    </label>
                    <input
                      className="w-full rounded-lg border bg-[#121212] px-3 py-2 text-white outline-none border-[#ae7aff]"
                      id="playlist-name"
                      placeholder="Enter playlist name"
                    />
                    <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
                      Create new playlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="mt-2 h-12 w-12 shrink-0">
              <Link to={`/channel/${video?.owner.username}`}>
                <img
                  src={video?.owner?.avatar}
                  className="h-full w-full rounded-full"
                />
              </Link>
            </div>
            <div className="block">
              <p className="text-gray-200">{video?.owner?.fullname}</p>
              <p className="text-sm text-gray-400">
                {video?.owner?.subscribersCount} Subscribers
              </p>
            </div>
          </div>
          <div className="block">
            {video?.owner._id === userData?._id ? (
              <Link to="/edit/personal-info">
                <Button className="group/btn flex gap-x-2">
                  <Pencil />
                  Edit
                </Button>
              </Link>
            ) : (
              <button
                onClick={toggleSubscription}
                className={`${
                  isSubscribed ? "bg-[#64748B]" : "bg-[#ae7aff]"
                } group/btn mr-1 flex w-full items-center gap-x-2  px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}
              >
                {isSubscribed ? <UserCheck /> : <UserPlus />}
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
        <hr className="my-4 border-white" />
        <div className="h-5 overflow-hidden group-focus:h-auto">
          <p className="text-sm">{video.description}</p>
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
