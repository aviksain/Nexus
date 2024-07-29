import { Play } from "lucide-react";
import { EmptyPage, VideoCard, VideoListingContainer } from "..";
import { useSelector } from "react-redux";

function HomeVideos() {
  const videos = useSelector((state: any) => state.video.videos);
  return (
    <>
      {videos.length > 0 ? (
        <VideoListingContainer>
          {videos.map((data: any) => (
            <VideoCard data={data} />
          ))}
        </VideoListingContainer>
      ) : (
        <EmptyPage name="liked videos" logo={<Play />} />
      )}
    </>
  );
}

export default HomeVideos;
