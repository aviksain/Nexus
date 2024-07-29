import { useDispatch, useSelector } from "react-redux";
import { toggleSubscriptionAPI } from "../../api/subscriptions";
import {
  toggleSubscription as toggleSubscriptionRedux,
  updateAvatar,
} from "../../redux/slices/channelSlice";
import toast from "react-hot-toast";
import {
  CircleX,
  CloudUpload,
  Loader,
  Pencil,
  Upload,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "..";
import { updateAvatarAPI } from "../../api/channel";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { reset } from "../../redux/slices/channelSlice";
import { saveUserData } from "../../redux/slices/authSlice";

function ChannelDetails({ isEdit }: { isEdit: boolean }) {
  let user = useSelector((state: RootState) => state.channel.userData);
  let userData = useSelector((state: RootState) => state.auth.userData);
  const isSubscribed = useSelector(
    (state: RootState) => state.channel.isSubscribed
  );
  const channelsSubscribedToCount = user?.channelsSubscribedToCount;
  const subscribersCount = user?.subscribersCount;
  if (user?._id === userData?._id || user?.username === "") {
    user = userData;
  }
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showBtn, setShowBtn] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const response = await updateAvatarAPI(file);
      dispatch(reset());
      dispatch(saveUserData(response));
      dispatch(updateAvatar(response.avatar));
      if (response) {
        toast.success("Avatar updated successfully");
        setAvatar(response.avatar);
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload failed", error);
    } finally {
      setShowBtn(false);
      setLoading(false);
    }
  };

  const ToggleButton = async () => {
    if (user?._id === userData?._id) {
      if (!isEdit) {
        navigate(`/edit/personal-info`);
        return;
      } else if (isEdit) {
        navigate(`/channel/${userData.username}/videos`);
      }
    } else {
      try {
        const response = await toggleSubscriptionAPI(user._id);
        console.log(response);
        dispatch(toggleSubscriptionRedux());
        if (response)
          toast.success(
            `${!isSubscribed ? "Subscribed" : "Unsubscribed"}  to ${
              user.fullname
            }`
          );
      } catch (error) {
        console.log("ToggleButton :: Error :: ", error);
      }
    }
  };

  
  if(!user) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 pb-4 pt-6">
        <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
          <img
            src={avatar}
            alt="Channel"
            className="h-full w-full object-cover"
          />
          {isEdit ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {showBtn ? (
                <div className="rounded-full">
                  {loading ? (
                    <>
                      <div className="flex">
                        <Loader className="animate-spin" />
                        Uploading
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <Button onClick={uploadFile} className="rounded-full">
                          <CloudUpload />
                        </Button>
                        <Button
                          className="rounded-full"
                          onClick={() => {
                            setShowBtn(false);
                            setAvatar(userData.avatar);
                          }}
                        >
                          <CircleX />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) {
                        const fileUrl = URL.createObjectURL(selectedFile);
                        setAvatar(fileUrl);
                        setShowBtn(true);
                        setFile(selectedFile);
                      }
                    }}
                  />
                  <label
                    htmlFor="avatar"
                    className="inline-block h-10 w-10 cursor-pointer rounded-lg p-1 text-[#ae7aff]"
                  >
                    <Upload />
                  </label>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </span>
        <div className="mr-auto inline-block">
          <h1 className="font-bolg text-xl">{user?.fullname}</h1>
          <p className="text-sm text-gray-400">@{user?.username}</p>
          {isEdit ? (
            <></>
          ) : (
            <p className="text-sm text-gray-400">
              {subscribersCount} Subscribers&nbsp;·&nbsp;
              {channelsSubscribedToCount} Subscribed
            </p>
          )}
        </div>
        <div className="inline-block">
          <div className="inline-flex min-w-[145px] justify-end">
            <button
              onClick={ToggleButton}
              className={`${
                isSubscribed ? "bg-[#64748B]" : "bg-[#ae7aff]"
              } group/btn mr-1 flex w-full items-center gap-x-2  px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}
            >
              {user._id === userData._id ? (
                !isEdit ? (
                  <>
                    <Pencil />
                    Edit
                  </>
                ) : (
                  <>View Channel</>
                )
              ) : isSubscribed ? (
                <>
                  <UserCheck />
                  Subscribed
                </>
              ) : (
                <>
                  <UserPlus />
                  Subscribe
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelDetails;
