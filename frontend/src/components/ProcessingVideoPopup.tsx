import { Loader } from "lucide-react";

function ProcessingVideoPopup({message}:any) {
  return (
    <>
      <div className=" text-white absolute inset-x-0 top-0 z-10 flex h-[calc(100vh-66px)] items-center justify-center bg-black/50 px-4 pb-[86px] pt-4 sm:h-[calc(100vh-82px)] sm:px-14 sm:py-8">
        <div className="w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-xl font-semibold">
              {message || "Uploading"} Video...
              <span className="block text-sm text-gray-300">
                Track your process.
              </span>
            </h2>
          </div>
          <div className="mb-6 flex gap-x-2 border p-3">
            <div className="flex flex-col">
              <div className="mt-2">
                <div className="flex justify-around">
                <Loader className="h-8 w-8 animate-spin" />
                <h3 className="bold text-xl ml-3">{message || "Uploading"}...</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcessingVideoPopup;
