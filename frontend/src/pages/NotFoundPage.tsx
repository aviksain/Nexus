import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import Image from "../public/NotFoundImg.png";
import { House, MoveLeft } from "lucide-react";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#121212] text-white">
      <section className="home grid h-screen pt-32 pb-16">
        <div className="home__container mx-auto w-[calc(100%-3rem)] max-w-screen-xl grid content-center gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center">
          <div className="home__data justify-self-center text-center lg:text-left">
            <p className="pb-2 font-semibold">Error 404</p>
            <h1 className="pb-4 text-5xl font-bold lg:text-6xl">Hey Buddy</h1>
            <p className="pb-8 font-semibold">
              We can't seem to find the page <br />
              you are looking for.
            </p>
            <div className="flex">
              <Button
                onClick={() => navigate(-1)}
                bgColor="bg-slate-500"
                className="mr-3 flex items-center"
                aria-label="Go Back"
              >
                <MoveLeft className="mr-2" />
                <span>Go Back</span>
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex items-center"
                aria-label="Go Home"
              >
                <House className="mr-2" />
                <span>Go Home</span>
              </Button>
            </div>
          </div>

          <div className="home__img justify-self-center">
            <img
              src={Image}
              className="w-64 animate-floting lg:w-[400px]"
              alt="A description of the image"
            />
            <div className="home__shadow mx-auto h-8 w-36 animate-shadow rounded-[50%] bg-gray-900/30 blur-md lg:w-64"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
