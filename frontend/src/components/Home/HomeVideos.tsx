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
            <VideoCard key={data._id} data={data} />
          ))}
        </VideoListingContainer>
      ) : (
        <EmptyPage name="videos" logo={<Play />} />
      )}
    </>
  );
}

export default HomeVideos;
