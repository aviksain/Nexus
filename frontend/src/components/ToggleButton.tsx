import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { togglePublishAPI } from "../api/dashboard";
import { togglePublishStatus } from "../redux/slices/dashboardSlice";
import toast from "react-hot-toast";

type data = {
  videoId: string;
  isPublished: boolean;
};

function ToggleButton({ videoId, isPublished }: data) {
  const [isChecked, setIsChecked] = useState(isPublished);
  const dispatch = useDispatch();

  const toggle = async () => {
    try {
      await togglePublishAPI(videoId);
      dispatch(togglePublishStatus(videoId));
      setIsChecked((prev: boolean) => !prev);
      isChecked
        ? toast.success("Video Unpublished")
        : toast.success("video Published");
    } catch (error) {
      toast.error("Failed to toggle video");
      console.log(error);
    }
  };

  return (
    <>
      <label
        htmlFor={videoId}
        className="relative inline-block w-12 cursor-pointer overflow-hidden"
      >
        <input
          id={videoId}
          type="checkbox"
          className="peer sr-only"
          onChange={toggle}
          checked={isChecked}
        />
        <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
      </label>
    </>
  );
}

export default ToggleButton;
