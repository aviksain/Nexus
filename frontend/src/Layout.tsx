import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const toastOptions = {
  duration: 5000,
  style: {
    borderRadius: "10px",
    background: "#121212",
    color: "#fff",
  },
};

function Layout() {
  return (
    <>
      <div className="bg-[#121212] text-white">
        <Outlet />
        <Toaster
          toastOptions={toastOptions}
          position="top-right"
          reverseOrder={false}
        />
      </div>
    </>
  );
}

export default Layout;
