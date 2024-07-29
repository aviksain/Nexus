import { getChannelStatsAPI, getChannelVideosAPI } from "../api/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  DashboardHeader,
  DashboardStats,
  DashboardTable,
  LoadingComp,
} from "../components";
import {
  updateChannelStats,
  updateChannelVideos,
} from "../redux/slices/dashboardSlice";
import { NavbarContainer } from ".";

function DashboardPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res1 = await getChannelStatsAPI();
      const res2 = await getChannelVideosAPI();
      dispatch(updateChannelStats(res1));
      dispatch(updateChannelVideos(res2));
      console.log(res2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  return (
    <NavbarContainer>
      {loading ? (
        <LoadingComp />
      ) : (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
          <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
              <DashboardHeader />
              <DashboardStats />
              <DashboardTable />
            </div>
          </div>
        </div>
      )}
    </NavbarContainer>
  );
}

export default DashboardPage;
