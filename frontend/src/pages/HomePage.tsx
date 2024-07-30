import { useEffect, useState } from "react";
import { getAllVideosAPI } from "../api/videos";
import { Body, LoadingComp, SideBar, HomeVideos } from "../components";
import { NavbarContainer } from ".";
import { useDispatch } from "react-redux";
import {
  deleteAllVideos,
  updateVideos,
  reset as resetReduxVideos,
} from "../redux/slices/videosSlice";

function HomePage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (page == 1) setLoading(true);
      try {
        if (page == 1) {
          dispatch(deleteAllVideos());
        }
        const response = await getAllVideosAPI({
          page,
          sortBy: "createdAt",
          sortType: "asc",
        });
        dispatch(updateVideos(response));
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  useEffect(() => {
    return () => {
      dispatch(resetReduxVideos());
    };
  }, [dispatch]);

  return (
    <NavbarContainer>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <SideBar />
        <Body>{loading ? <LoadingComp /> : <HomeVideos />}</Body>
      </div>
    </NavbarContainer>
  );
}

export default HomePage;
