import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface SideBarButtonsProps {
  logo: ReactNode;
  name: string;
  route?: string;
  onClick?: () => Promise<void | undefined>; // Adjust this type if necessary
}

const SideBarButtons: React.FC<SideBarButtonsProps> = ({
  logo,
  name,
  route,
  onClick,
  ...props
}) => {
  return (
      <NavLink to={route || ""}
        onClick={onClick}
        className={({ isActive }) => `${isActive ? "text-black bg-[#ae7aff] border-[#ae7aff]" : "text-white border-white focus:text-[#ae7aff] sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black"} flex flex-col items-center justify-center  py-1  sm:w-full sm:flex-row sm:border sm:p-1.5  sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`}
        {...props}
      >
        <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
          {logo}
        </span>
        <span className="block sm:hidden sm:group-hover:inline lg:inline">
          {name}
        </span>
    </NavLink>
  );
};

export default SideBarButtons;
