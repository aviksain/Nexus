import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { getVideoByIdAPI } from "../api/videos";
import { NavbarContainer } from ".";
import {
  Body,
  LoadingComp,
  SideBar,
  SuggestedVideos,
  VideoComments,
  VideoDetails,
} from "../components";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  reset as resetVideoDetails,
  toggleSubscription,
  updateVideo,
} from "../redux/slices/videosSlice";
import {
  updateComment,
  reset as resetVideoComments,
} from "../redux/slices/commentSlice";
import { getVideoCommentsAPI } from "../api/comment";
import { getSubscriberChannelsAPI } from "../api/subscriptions";

function VideoPlayPage() {
  const video = useSelector((state: any) => state.video.video);
  const userData = useSelector((state: any) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getVideoByIdAPI(id!);
        if (res) {
          dispatch(updateVideo(res));
          if (res.isSubscribed) {
            dispatch(toggleSubscription());
          }
          const comments = await getVideoCommentsAPI(id!);
          dispatch(updateComment(comments));
        }
      } catch (error: any) {
        toast.error("Error fetching video data");
        console.error("Error fetching video data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetVideoDetails());
      dispatch(resetVideoComments());
    };
  }, [dispatch]);

  return (
    <NavbarContainer>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <SideBar />
        <Body>
          {loading ? (
            <LoadingComp />
          ) : (
            <div className="flex w-full flex-wrap rounded-xl gap-4 p-4 lg:flex-nowrap">
              <div className="col-span-12 w-full">
                <div className="relative mb-4 w-full  pt-[56%]">
                  <div className="absolute inset-0 ">
                    <ReactPlayer
                      url={video.videoFile}
                      height={"100%"}
                      width={"100%"}
                      controls={true}
                      volume={1}
                      playing={false}
                      pip={true}
                      light={video.thumbnail} // Use the thumbnail as a placeholder image
                      config={{
                        file: {
                          attributes: {
                            crossOrigin: "anonymous",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <VideoDetails />
                <VideoComments />
              </div>
              <SuggestedVideos />
            </div>
          )}
        </Body>
      </div>
    </NavbarContainer>
  );
}

export default VideoPlayPage;
