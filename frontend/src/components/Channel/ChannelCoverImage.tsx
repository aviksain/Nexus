import { CircleX, CloudUpload, Loader, Upload } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { updateCoverImageAPI } from "../../api/channel";
import toast from "react-hot-toast";
import { updateCoverImage } from "../../redux/slices/channelSlice";
import { saveUserData } from "../../redux/slices/authSlice";

const ChannelCoverImage = ({ isEdit }: { isEdit: boolean }) => {
  const [showBtn, setShowBtn] = useState(false);
  let user = useSelector((state: any) => state.channel.userData);
  const userData = useSelector((state: any) => state.auth.userData);
  if (user?._id === userData?._id || user?.username === "") user = userData;
  const [coverImage, setCoverImage] = useState<string | undefined>(
    user?.coverImage
  );
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const response = await updateCoverImageAPI(file);
      dispatch(saveUserData(response));
      dispatch(updateCoverImage(response.coverImage));
      if (response) {
        toast.success("Cover image updated successfully");
        setCoverImage(response.coverImage);
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload failed", error);
    } finally {
      setShowBtn(false);
      setLoading(false);
    }
  };

  if(!user) {
    return <></>;
  }

  return (
    <div className="relative min-h-[150px] w-full pt-[16.28%]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={coverImage || "/default-cover.jpg"}
          alt="cover-photo"
          className="w-full h-full object-cover"
        />
      </div>
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
                    <Button onClick={uploadFile}>
                      <div className="flex">
                        <CloudUpload />
                        <span className="ml-2">Upload</span>
                      </div>
                    </Button>
                    <Button
                      className="ml-2"
                      onClick={() => {
                        setShowBtn(false);
                        setCoverImage(userData.coverImage);
                      }}
                    >
                      <div className="flex">
                        <CircleX />
                        <span className="ml-2">Cancel</span>
                      </div>
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <input
                type="file"
                id="cover-image"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    const fileUrl = URL.createObjectURL(selectedFile);
                    setCoverImage(fileUrl);
                    setShowBtn(true);
                    setFile(selectedFile);
                  }
                }}
              />
              <label
                htmlFor="cover-image"
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
    </div>
  );
};

export default ChannelCoverImage;
