import { Link } from "react-router-dom";
import { timeAgo, formatDuration } from "../utils/calculateTime";

interface VideoData {
  _id: string;
  duration: number;
  thumbnail: string;
  title: string;
  views: number;
  createdAt: string;
  owner: {
    avatar: string;
    username: string;
  };
}

const VideoCard = ({ data }: { data: VideoData }) => {
  const videoLength = formatDuration(data.duration);
  const timeAgoText = timeAgo(data.createdAt);
  return (
    <div key={data._id} >
      <Link to={`/video/${data._id}`}>
        <div
          key={data._id}
          className="w-full hover:bg-[#3E3E52] rounded-xl p-2"
        >
          <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={data.thumbnail}
                alt={`Thumbnail of ${data.title}`}
                className="h-full w-full rounded-xl"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm text-white">
              {videoLength}
            </span>
          </div>
          <div className="flex gap-x-2">
            <div className="h-10 w-10 shrink-0">
              <Link to={`/channel/${data.owner.username}/videos`}>
                <img
                  src={data.owner.avatar}
                  alt={`Avatar of ${data.owner.username}`}
                  className="h-full w-full rounded-full"
                />
              </Link>
            </div>
            <div className="w-full">
              <h6 className="mb-1 font-semibold text-white">{data.title}</h6>
              <p className="flex text-sm text-gray-200">
                {data.views} views · {timeAgoText}
              </p>
              <p className="text-sm text-gray-200">{data.owner.username}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
