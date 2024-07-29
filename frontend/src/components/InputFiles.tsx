import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFilesProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
}

const InputFiles: React.FC<InputFilesProps> = ({register, label, name}) => {
  const [text, setText] = useState(label);

  return (
    <>
      <label
        htmlFor={name}
        className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
      >
        <input
          id={name}
          type="file"
          className="sr-only"
          {...register(name, {
            required: "Video is required",
            onChange: (e) => setText(e.target.files[0]?.name),
          })}
        />
        {text}
      </label>
    </>
  );
}

export default InputFiles;
