import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { togglePublishAPI } from "../../api/dashboard.ts";
import { channelVideosType } from "../../Types/dashboard";
import { ToggleButton, UpdateVideoPopup } from "../index.ts";
import { deleteVideoAPI } from "../../api/videos.ts";
import DeleteVideoPopup from "../DeleteVideoPopup.tsx";
import { useState } from "react";
import { timeAgo } from "../../utils/calculateTime.ts";

function DashboardTable() {
  const channelVideos: channelVideosType[] = useSelector(
    (state: any) => state.dashboard.channelVideos
  ) || [];

  const [showDelPopup, setShowDelPopup] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [showUpdatePopup, setShowUpdatePopup] = useState<{ [key: string]: boolean }>(
    {}
  );

  return (
    <>
      <div className="w-full overflow-auto">
        <table className="w-full min-w-[1200px] border-collapse border text-white">
          <thead>
            <tr>
              <th className="border-collapse border-b p-4">Status</th>
              <th className="border-collapse border-b p-4">Status</th>
              <th className="border-collapse border-b p-4">Uploaded</th>
              <th className="border-collapse border-b p-4">Rating</th>
              <th className="border-collapse border-b p-4">Date uploaded</th>
              <th className="border-collapse border-b p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {channelVideos.map(
              (
                { _id, isPublished, thumbnail, title, likes, createdAt }
              ) => {
                let til = title?.substr(0, 7) + "...";
                return (
                  <tr key={_id} className="group border">
                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                      <div className="flex justify-center">
                        <ToggleButton videoId={_id} isPublished={isPublished} />
                      </div>
                    </td>
                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                      <div className="flex justify-center">
                        <span
                          className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                            isPublished
                              ? "border-green-600 text-green-600"
                              : "border-orange-600 text-orange-600"
                          }`}
                        >
                          {isPublished ? "Published" : "Unpublished"}
                        </span>
                      </div>
                    </td>
                    <td className="text-center border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                      <div className="flex items-center gap-4">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={thumbnail}
                          alt="Code Master"
                        />
                        <h3 className="font-semibold">{til}</h3>
                      </div>
                    </td>
                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                      <div className="flex justify-center gap-4">
                        <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                          {likes} likes
                        </span>
                      </div>
                    </td>
                    <td className="text-center border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                      {timeAgo(createdAt)}
                    </td>
                    <td className="items-center border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            setShowDelPopup((prevState) => ({
                              ...prevState,
                              [_id]: true,
                            }))
                          }
                          className="h-5 w-5 hover:text-[#ae7aff]"
                        >
                          <Trash2 />
                        </button>
                        <button onClick={() =>
                            setShowUpdatePopup((prevState) => ({
                              ...prevState,
                              [_id]: true,
                            }))
                          }
                          className="h-5 w-5 hover:text-[#ae7aff]">
                          <Pencil />
                        </button>
                      </div>
                    </td>
                    {/* Render DeleteVideoPopup conditionally */}
                    {showDelPopup[_id] && (
                      <DeleteVideoPopup
                        show={showDelPopup[_id]}
                        setShow={(value: boolean) =>
                          setShowDelPopup({ ...showDelPopup, [_id]: value })
                        }
                        id={_id}
                      />
                    )}
                    {showUpdatePopup[_id] && (
                      <UpdateVideoPopup
                        show={showUpdatePopup[_id]}
                        setShow={(value: boolean) =>
                          setShowUpdatePopup({ ...showUpdatePopup, [_id]: value })
                        }
                        id={_id}
                      />
                    )}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashboardTable;
