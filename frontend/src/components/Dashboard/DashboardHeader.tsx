import { Plus } from "lucide-react";
import { useState } from "react";
import {UploadVideoPopUp} from "../index";
import { useSelector } from "react-redux";

function DashboardHeader() {
  const [show,setShow] = useState(false);
  const userData = useSelector((state: any) => state.auth.userData);
  const changeShow = () => {
    setShow(!show);
  }

  return (
    <>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="block">
          <h1 className="text-2xl font-bold">Welcome Back, {userData?.username}</h1>
          <p className="text-sm text-gray-300">
            Seamless Video Management, Elevated Results.
          </p>
        </div>
        <div className="block">
          <button onClick={changeShow} className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black">
            <Plus />
            Upload video
          </button>
        </div>
      </div>
      <UploadVideoPopUp show={show} changeshow={changeShow}/>
    </>
  );
}

export default DashboardHeader;
