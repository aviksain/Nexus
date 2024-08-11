import { useDispatch, useSelector } from "react-redux";
import {
  VideoListingContainer,
  VideoCard,
  EmptyPage,
} from "../../components/index";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllVideosAPI } from "../../api/videos";
import {
  resetChannelVideos,
  updateVideos,
} from "../../redux/slices/channelSlice";
import { RootState, AppDispatch } from "../../redux/store"; // Adjust imports based on your setup

function ChannelVideos() {
  const dispatch: AppDispatch = useDispatch();
  const channelOwnerId = useSelector(
    (state: RootState) => state.channel.userData._id
  );
  const videos = useSelector((state: RootState) => state.channel.channelVideos);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    return () => {
      dispatch(resetChannelVideos());
    };
  }, [dispatch]);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (channelOwnerId) {
      const fetchChannelVideos = async () => {
        try {
          const channelVideos = await getAllVideosAPI({
            userId: channelOwnerId,
            page,
            sortBy: "createdAt",
            sortType: "dsc",
          });
          dispatch(updateVideos(channelVideos));
        } catch (err) {
          console.error(err);
        }
      };

      fetchChannelVideos();
    }
  }, [channelOwnerId, page, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      {videos.length > 0 ? (
        <VideoListingContainer>
          {videos.map((data: any) => (
            <VideoCard key={data._id} data={data} />
          ))}
        </VideoListingContainer>
      ) : (
        <EmptyPage name="videos" logo={<Play />} />
      )}
    </>
  );
}

export default ChannelVideos;
