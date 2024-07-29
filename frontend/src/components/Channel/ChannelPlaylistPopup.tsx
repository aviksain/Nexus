import { X } from "lucide-react";
import { Input } from "..";


function ChannelPlaylistPopup({show, setShow}:any) {
  if(!show) {
    return null;
  }


  return (
    <>
      <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
          <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-semibold">
                Create Playlist
                <span className="block text-sm text-gray-300">
                  Import your preferred videos here
                </span>
              </h2>
              <button onClick={() => setShow(false)} className="h-6 w-6">
                <X />
              </button>
            </div>
            <form className="w-full">
              <div className="mb-6 flex flex-col gap-y-4">
                <div className="w-full">
                  <label htmlFor="title" className="mb-1 inline-block">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter video title"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="description" className="mb-1 inline-block">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="h-40 w-full resize-none border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                    placeholder="Enter video description"
                  ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShow(false)}
                  className="border px-4 py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default ChannelPlaylistPopup