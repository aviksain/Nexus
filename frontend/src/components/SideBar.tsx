import {
  House,
  ThumbsUp,
  History,
  FolderClosed,
  Video,
  UserCheck,
  LogOut,
  Settings,
} from "lucide-react";
import SideBarButtons from "./SideBarButtons.tsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../api/auth.ts";
import { deleteUserData } from "../redux/slices/authSlice.ts";

const SideBar = () => {
  const userData = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    await logoutAPI().then(() => {
      dispatch(deleteUserData());
    });
  };

  return (
    <aside className="group fixed inset-x-0 bottom-0 w-full z-40 shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
      <ul className="flex text-white justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
        <li key="1" className="">
          <SideBarButtons name="Home" logo={<House />} route="/" />
        </li>
        <li key="2" className="hidden sm:block">
          <SideBarButtons
            name="Liked Videos"
            logo={<ThumbsUp />}
            route="/liked-videos"
          />
        </li>
        <li key="3" className="">
          <SideBarButtons name="History" logo={<History />} route="/history" />
        </li>
        <li key="4" className="hidden sm:block">
          <SideBarButtons
            name="My Channel"
            logo={<Video />}
            route={`/channel/${userData?.username}/videos`}
          />
        </li>
        <li key="5" className="">
          <SideBarButtons
            name="Dashboard"
            logo={<FolderClosed />}
            route="/dashboard"
          />
        </li>
        <li key="6" className="">
          <SideBarButtons
            name="Subscribed"
            logo={<UserCheck />}
            route="/subscribed-channels"
          />
        </li>
        <li key="7" className="hidden sm:block mt-auto">
          {userData && (
            <button
              onClick={logoutUser}
              className={` text-white border-white focus:text-[#ae7aff] sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black flex flex-col items-center justify-center  py-1  sm:w-full sm:flex-row sm:border sm:p-1.5  sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <LogOut />
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Logout
              </span>
            </button>
          )}
        </li>
        <li key="8" className="hidden sm:block">
          <SideBarButtons
            name="Settings"
            logo={<Settings />}
            route={`/settings`}
          />
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
