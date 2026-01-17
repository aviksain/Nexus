import { useEffect, useState } from "react";
import { getAllVideosAPI } from "../../api/videos";
import { formatDuration, timeAgo } from "../../utils/calculateTime";
import { useNavigate } from "react-router-dom";

function SuggestedVideos() {
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllVideosAPI({ sortBy: "views" });
        setSuggestedVideos(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
        {suggestedVideos.map((video: any) => (
          <div
            key={video._id}
            onClick={() => navigate(`/video/${video._id}`)}
            className="hover:bg-[#3E3E52] w-full rounded-lg gap-x-2 border pr-2 md:flex"
          >
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  {formatDuration(video.duration)}
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src={video.owner.avatar}
                  alt={video.owner.username}
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">{video.title}</h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">
                  {video.owner.username}
                </p>
                <p className="flex text-sm text-gray-200">
                  {video.views} Views · {timeAgo(video.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SuggestedVideos;
