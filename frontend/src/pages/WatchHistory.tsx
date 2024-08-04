import { useEffect, useState } from "react";
import { NavbarContainer } from ".";
import { Body, EmptyPage, SideBar } from "../components";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getwatchHistoryAPI } from "../api/history";
import { formatDuration, timeAgo } from "../utils/calculateTime";
import LoadingComp from "../components/LoadingComp"; 
import { Link } from "react-router-dom";
import { History } from "lucide-react";

type HistoryItem = {
  _id: string;
  thumbnail: string;
  title: string;
  duration: number;
  views: number;
  createdAt: string;
  owner: {
    _id: string;
    avatar: string;
    username: string;
  };
  description: string;
};

function WatchHistory() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getwatchHistoryAPI();
        if (data) {
          setHistory(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  return (
    <NavbarContainer>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <SideBar />
        <Body>
          {loading ? (
            <LoadingComp />
          ) : history.length > 0 ? (
            history.map((it: HistoryItem) => (
              <div className="flex flex-col gap-4 p-4">
                <div
                  key={it._id}
                  className="hover:bg-[#3E3E52] rounded-xl p-2 w-full max-w-3xl gap-x-4 md:flex"
                >
                  <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                    <Link to={`/video/${it._id}`}>
                      <div className="w-full pt-[56%]">
                        <div className="absolute inset-0">
                          <img
                            src={it.thumbnail}
                            alt={it.title}
                            className="h-full w-full rounded-xl"
                          />
                        </div>
                        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          {formatDuration(it.duration)}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="flex gap-x-2 md:w-7/12">
                    <div className="h-10 w-10 shrink-0 md:hidden">
                      <Link to={`/channel/${it.owner._id}`}>
                        <img
                          src={it.owner.avatar}
                          alt={it.owner.username}
                          className="h-full w-full rounded-full"
                        />
                      </Link>
                    </div>
                    <div className="w-full">
                      <h6 className="mb-1 font-semibold md:max-w-[75%]">
                        {it.title}
                      </h6>
                      <p className="flex text-sm text-gray-200 sm:mt-3">
                        {it.views} Views · {timeAgo(it.createdAt)}
                      </p>
                      <div className="flex items-center gap-x-4">
                        <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                          <Link to={`/channel/${it.owner._id}`}>
                            <img
                              src={it.owner.avatar}
                              alt={it.owner.username}
                              className="h-full w-full rounded-full"
                            />
                          </Link>
                        </div>
                        <p className="text-sm text-gray-200">
                          {it.owner.username}
                        </p>
                      </div>
                      <p className="mt-2 hidden text-sm md:block">
                        {it.description.length > 193
                          ? it.description.substr(0, 190) + "..."
                          : it.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyPage name="history" logo={<History />} />
          )}
        </Body>
      </div>
    </NavbarContainer>
  );
}

export default WatchHistory;
