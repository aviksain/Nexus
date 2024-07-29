import { useEffect, useState } from "react";
import { NavbarContainer } from ".";
import {
  Body,
  ChannelButtonsComp,
  ChannelCoverImage,
  ChannelDetails,
  LoadingComp,
  SideBar,
} from "../components";
import { getUserChannelProfileAPI } from "../api/channel";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {
  reset as channelReset,
  toggleSubscription,
  updateUser,
  updateVideos,
} from "../redux/slices/channelSlice";
import { getAllVideosAPI } from "../api/videos";


function ChannelPage() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const userData = useSelector((state: any) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [channelOwnerId, setChannelOwnerId] = useState("");

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchChannelOwner = async () => {
      setLoading(true);
      try {
        const response = await getUserChannelProfileAPI(username!);
        console.log(response);
        dispatch(updateUser(response));
        setChannelOwnerId(response._id);
        if(response.isSubscribed) {
          dispatch(toggleSubscription());
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelOwner();
  }, [username, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(channelReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (channelOwnerId) {
      const fetchChannelVideos = async () => {
        try {
          const channelVideos = await getAllVideosAPI({
            userId: channelOwnerId,
            page,
            sortBy: "createdAt",
            sortType: "asc",
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

  if(!userData) {
    return null;
  }

  return (
    <>
      <NavbarContainer>
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <Body>
            {loading ? (
              <LoadingComp />
            ) : (
              <>
                <ChannelCoverImage isEdit={false}/>
                <div className="px-4 pb-4">
                  <ChannelDetails isEdit={false}/>
                  <ChannelButtonsComp type="main" />
                  <Outlet />
                </div>
              </>
            )}
          </Body>
        </div>
      </NavbarContainer>
    </>
  );
}

export default ChannelPage;
