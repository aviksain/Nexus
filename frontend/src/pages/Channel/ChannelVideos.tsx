import { useDispatch, useSelector } from "react-redux";
import {
  VideoListingContainer,
  VideoCard,
  EmptyPage,
} from "../../components/index";
import { Play } from "lucide-react";
import { resetVideos } from "../../redux/slices/channelSlice";
import { useEffect } from "react";
function ChannelVideos() {
  const videos = useSelector((state: any) => state.channel.channelVideos);
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(resetVideos());
    };
  }, [dispatch]);

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
