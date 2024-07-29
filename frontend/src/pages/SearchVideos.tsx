import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllVideosAPI } from "../api/videos";
import { NavbarContainer } from ".";
import {
  Body,
  EmptyPage,
  SideBar,
  VideoCard,
  VideoListingContainer,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllVideos, updateVideos } from "../redux/slices/videosSlice";
import { Play } from "lucide-react";

function SearchVideos() {
  const videos = useSelector((state: any) => state.video.videos);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (page == 1) {
          dispatch(deleteAllVideos());
        }
        const response = await getAllVideosAPI({
          query: params.query || "",
          page,
          sortBy: "createdAt",
          sortType: "asc",
        });
        console.log(response);
        dispatch(updateVideos(response));
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchData();
  }, [page, dispatch, params]);

  return (
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
            <EmptyPage name="liked videos" logo={<Play />} />
          )}
        </Body>
      </div>
    </NavbarContainer>
  );
}

export default SearchVideos;
