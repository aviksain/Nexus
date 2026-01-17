import { Eye, User, Heart, Video } from "lucide-react";
import { useSelector } from "react-redux";

const DashboardStats = () => {
  const channelStats = useSelector(
    (state: any) => state.dashboard.channelStats
  );
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
        <div className="border p-4">
          <div className="mb-4 block">
            <span className="inline-block h-7 w-7 p-1 text-[#ae7aff]">
              <Video />
            </span>
          </div>
          <h6 className="text-gray-300">Total videos</h6>
          <p className="text-3xl font-semibold">{channelStats?.totalVideos}</p>
        </div>
        <div className="border p-4">
          <div className="mb-4 block">
            <span className="inline-block h-7 w-7 p-1 text-[#ae7aff]">
              <Eye />
            </span>
          </div>
          <h6 className="text-gray-300">Total views</h6>
          <p className="text-3xl font-semibold">{channelStats?.totalViews}</p>
        </div>
        <div className="border p-4">
          <div className="mb-4 block">
            <span className="inline-block h-7 w-7 p-1 text-[#ae7aff]">
              <User />
            </span>
          </div>
          <h6 className="text-gray-300">Total subscribers</h6>
          <p className="text-3xl font-semibold">
            {channelStats?.totalSubscribers}
          </p>
        </div>
        <div className="border p-4">
          <div className="mb-4 block">
            <span className="inline-block h-7 w-7 p-1 text-[#ae7aff]">
              <Heart />
            </span>
          </div>
          <h6 className="text-gray-300">Total likes</h6>
          <p className="text-3xl font-semibold">{channelStats?.totalLikes}</p>
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
