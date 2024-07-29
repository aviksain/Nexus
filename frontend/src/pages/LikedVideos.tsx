import { NavbarContainer } from ".";
import {
  Body,
  EmptyPage,
  SideBar,
  VideoCard,
  VideoListingContainer,
} from "../components";
import { getLikeVideoAPI } from "../api/like";
import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";

function LikedVideos() {
  const [videos, setVideos] = useState<Array<Object>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLikeVideoAPI();
        let vid: Array<Object> = [];
        response.map((res: any) => {
          vid.push(res.video[0]);
        });
        setVideos(vid);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarContainer>
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <Body>
            {videos.length > 0 ? (
              <VideoListingContainer>
                {videos.map((data: any) => (
                  <VideoCard data={data} />
                ))}
              </VideoListingContainer>
            ) : (
              <EmptyPage name="liked videos" logo={<ThumbsUp />}/>
            )}
          </Body>
        </div>
      </NavbarContainer>
    </>
  );
}

export default LikedVideos;
