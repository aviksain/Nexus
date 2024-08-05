import { useDispatch, useSelector } from "react-redux";
import { Button } from "./index.ts";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Menu,
  Search,
  Settings,
  ThumbsUp,
  Video,
  X,
} from "lucide-react";
import Logo from "../LoGo/Logo.tsx";
import SearchBar from "./SearchBar.tsx";
import { logoutAPI } from "../api/auth.ts";
import { deleteUserData } from "../redux/slices/authSlice.ts";
import SearchPopUp from "./SearchPopUp.tsx";
import { useState } from "react";
import { RootState } from "../redux/store.ts";

function Header() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    await logoutAPI().then(() => {
      dispatch(deleteUserData());
    });
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
        <nav className="w-full h-[75px] bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 sticky top-0 z-50">
          <div className="mr-4 text-white w-12 shrink-0 sm:w-16">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <button className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
            <SearchBar />
          </button>
          <button className="ml-auto sm:hidden" onClick={() => setShow(!show)}>
            <Search />
          </button>
          <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
            <Menu />
          </button>
          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
            <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
              <span className="inline-block w-12">
                <Logo />
              </span>
              <button className="inline-block w-8">
                <X />
              </button>
            </div>
            <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
              <li className="w-full">
                <button
                  className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black"
                  onClick={() => navigate("/liked-videos")}
                >
                  <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                    <ThumbsUp />
                  </span>
                  <span>Liked Videos</span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black"
                  onClick={() => navigate(`/channel/${userData.username}`)}
                >
                  <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                    <Video />
                  </span>
                  <span>My Channel</span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black"
                  onClick={() => navigate("/settings")}
                >
                  <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                    <Settings />
                  </span>
                  <span>Settings</span>
                </button>
              </li>
              {userData && (
                <li className="w-full">
                  <button
                    className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black"
                    onClick={logoutUser}
                  >
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <LogOut />
                    </span>
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
            <div className="w-full">
              {userData ? (
                <Link
                  to={`/channel/${userData?.username}/videos`}
                  className="flex w-full gap-4  text-left sm:items-center"
                >
                  <img
                    src={userData?.avatar}
                    alt="React-Patterns"
                    className="h-16 w-16 shrink-0 border-2 border-[#AE7AFF] rounded-full sm:h-12 sm:w-12"
                  />
                </Link>
              ) : (
                <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
                  <Link
                    to="/login"
                    className="w-full text-white bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent"
                  >
                    Log in
                  </Link>
                  <Link to="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <SearchPopUp show={show} setShow={setShow} />
    </>
  );
}

export default Header;
