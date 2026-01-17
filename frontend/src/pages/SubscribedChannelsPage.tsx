import { useEffect, useState } from "react";
import { NavbarContainer } from ".";
import { Body, EmptyPage, SideBar } from "../components";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getSubscribedChannelsAPI } from "../api/subscriptions";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

function SubscribedChannelsPage() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubscribedChannelsAPI(userData._id);
        setChannels(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

  return (
    <>
      <NavbarContainer>
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <Body>
            {channels?.length > 0 ? (
              <div className="container mx-auto p-5">
                <h1 className="text-3xl font-bold my-2">Subscriptions</h1>
                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-2">
                  {channels?.map((it: any) => (
                    <Link to={`/channel/${it.channel?.username}`}>
                      <div className="flex flex-col items-center gap-2  rounded-lg">
                        <img
                          src={it.channel?.avatar}
                          alt={it.channel?.title}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <p className="text-lg font-semibold">
                          {it.channel?.username}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyPage name="Subscribed Channels" logo={<UserPlus />}/>
            )}
          </Body>
        </div>
      </NavbarContainer>
    </>
  );
}

export default SubscribedChannelsPage;
