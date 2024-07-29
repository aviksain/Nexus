import { ListPlus, Plus } from "lucide-react";
import { Button, EmptyPage } from "../../components";
import ChannelPlaylistPopup from "../../components/Channel/ChannelPlaylistPopup";
import { useState } from "react";
function ChannelPlaylist() {
  const [show,setShow] = useState(false);
  return (
    <>
      <div className="w-full pt-2 text-right flex justify-end">
        <Button className="flex" onClick={() => setShow(true)}>
          <Plus />
          <span>Create Playlist</span>
        </Button>
      </div>
      {/* <div className="grid lg:grid-cols-[repeat(3,_minmax(300px,_1fr))] grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        <div className="w-full hover:bg-[#3E3E52] rounded-xl p-2">
          <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"
                alt="React Mastery"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute inset-x-0 bottom-0">
                <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                  <div className="relative z-[1]">
                    <p className="flex justify-between">
                      <span className="inline-block">Playlist</span>
                      <span className="inline-block">12&nbsp;videos</span>
                    </p>
                    <p className="text-sm text-gray-200">
                      100K Views&nbsp;·&nbsp;2 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h6 className="mb-1 font-semibold">React Mastery</h6>
          <p className="flex text-sm text-gray-200">
            Master the art of building dynamic user interfaces with React.
          </p>
        </div>

      </div> */}
      <EmptyPage name="playlist" logo={<ListPlus />}/>
      <ChannelPlaylistPopup show={show} setShow={setShow}/>
    </>
  );
}

export default ChannelPlaylist;
