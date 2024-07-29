import { Link } from "react-router-dom";
import { Button } from "../components";

function NotFoundPage() {
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#121212]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#ae7aff] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>

        <Link to="/" className="mt-2">
          <Button>Go Home</Button>
        </Link>
      </main>
    </>
  );
}

export default NotFoundPage;
