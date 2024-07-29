import { Play } from "lucide-react";
import React from "react";
import { ReactNode } from "react";

interface compType {
  logo: ReactNode;
  name: string;
}

const EmptyVideo: React.FC<compType> = ({ name = "videos", logo=<Play /> }) => {
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div className="mt-5 w-full max-w-sm text-center">
          <p className="mb-3 w-full">
            <span className="inline-flex rounded-full border border-[#AE7AFF] p-2 text-[#AE7AFF]">
              {logo}
            </span>
          </p>
          <h5 className="mb-2 font-semibold">No {name} available</h5>
          <p>
            There are no {name} here available. Please try to search some thing
            else.
          </p>
        </div>
      </div>
    </>
  );
};

export default EmptyVideo;
