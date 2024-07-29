import { useSelector } from "react-redux";
import {
  VideoListingContainer,
  VideoCard,
  EmptyPage,
} from "../../components/index";
import { Play } from "lucide-react";

function ChannelVideos() {
  const videos = useSelector((state: any) => state.channel.channelVideos);
  return (
    <>
      {videos.length > 0 ? (
        <VideoListingContainer>
          {videos.map((data: any) => (
            <VideoCard data={data} />
          ))}
        </VideoListingContainer>
      ) : (
        <EmptyPage name="videos" logo={<Play />} />
      )}
    </>
  );
}

export default ChannelVideos;
