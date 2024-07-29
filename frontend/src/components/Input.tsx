import React from "react";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  type?: string;
  placeholder?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({
  className = "",
  type = "text",
  placeholder = "Enter something...",
  ...props
}, ref) {
  return (
    <input
      placeholder={placeholder}
      autoComplete="off"
      ref={ref}
      type={type}
      className={`${className} w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500`}
      {...props}
    />
  );
});

export default Input;

