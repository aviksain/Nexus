import { Upload } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import ReactPlayer from "react-player";

interface InputImageProps {
  control: any;
  fileType?: "image" | "video";
  src?: string;
  name: string;
  [key: string]: any; // For any other props
}

const InputImage: React.FC<InputImageProps> = ({
  control,
  fileType = "image",
  src,
  name,
  errors,
  req=true,
  ...props
}) => {
  const [currFile, setCurrFile] = useState<string | null>(src || null);

  useEffect(() => {
    return () => {
      if (currFile && src !== currFile) {
        URL.revokeObjectURL(currFile);
      }
    };
  }, [currFile, src]);

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setCurrFile(fileURL);
      return files;
    }
    return null;
  };

  return (
    <>
      <label
        className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
        htmlFor={name}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={src}
          render={({ field: { onChange } }) => (
            <>
              <input
                id={name}
                type="file"
                {...props}
                className="hidden"
                onChange={(e) => {
                  const files = handlePreview(e);
                  if (files) onChange(files);
                }}
                required={req}
              />
              <label
                htmlFor={name}
                className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 text-white text-xs rounded cursor-pointer"
              >
                <Upload />
              </label>
            </>
          )}
        />
        {currFile &&
          (fileType === "image" ? (
            <img src={currFile} alt="Preview" style={{ maxWidth: "100%" }} />
          ) : (
            <ReactPlayer
            width={"100%"}
              url={currFile}
              loop={true}
              playing={true}
              muted={true}
              pip={false}
            />
          ))}
      </label>
    </>
  );
};

export default InputImage;
