import { NavLink, useParams } from "react-router-dom";

function ChannelButtonsComp({ type }: { type: string }) {
  const { username } = useParams();

  if (type == "main") {
    return (
      <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[73px]">
        <NavLink
          to={`/channel/${username}/videos`}
          className={({ isActive }) =>
            `text-center w-full border-b-2 px-3 py-1.5 ${
              isActive
                ? "border-[#ae7aff] bg-[#221c3d] text-[#ae7aff]"
                : "border-transparent text-gray-400"
            }`
          }
        >
          Videos
        </NavLink>
        <NavLink
          to={`/channel/${username}/playlist`}
          className={({ isActive }) =>
            `text-center w-full border-b-2 px-3 py-1.5 ${
              isActive
                ? "border-[#ae7aff] bg-[#221c3d] text-[#ae7aff]"
                : "border-transparent text-gray-400"
            }`
          }
        >
          Playlist
        </NavLink>
        <NavLink
          to={`/channel/${username}/tweets`}
          className={({ isActive }) =>
            `text-center w-full border-b-2 px-3 py-1.5 ${
              isActive
                ? "border-[#ae7aff] bg-[#221c3d] text-[#ae7aff]"
                : "border-transparent text-gray-400"
            }`
          }
        >
          Tweets
        </NavLink>
        <NavLink
          to={`/channel/${username}/subscribers`}
          className={({ isActive }) =>
            `text-center w-full border-b-2 px-3 py-1.5 ${
              isActive
                ? "border-[#ae7aff] bg-[#221c3d] text-[#ae7aff]"
                : "border-transparent text-gray-400"
            }`
          }
        >
          Subscribers
        </NavLink>
      </ul>
    );
  }

  if (type == "edit") {
    return (
      <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[73px]">
        <NavLink
          to={`/edit/personal-info`}
          className={({ isActive }) =>
            `text-center w-full border-b-2 px-3 py-1.5 ${
              isActive
                ? "border-[#ae7aff] bg-[#221c3d] text-[#ae7aff]"
                : "border-transparent text-gray-400"
            }`
          }
        >
          Personal Info
        </NavLink>
        <NavLink
          to={`/edit/password`}
          className={({ isActive }) =>
            `text-center w-full border-b-2 px-3 py-1.5 ${
              isActive
                ? "border-[#ae7aff] bg-[#221c3d] text-[#ae7aff]"
                : "border-transparent text-gray-400"
            }`
          }
        >
          Password
        </NavLink>
      </ul>
    );
  }
}

export default ChannelButtonsComp;
