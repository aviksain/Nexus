import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  bgColor = "bg-[#ae7aff]",
  textColor = "text-black",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${bgColor} ${textColor} ${className} mr-1 w-full px-3 py-2 text-center font-bold  shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button