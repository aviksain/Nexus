import playImg from "./play.png";
import "./logo.css";

function Logo() {
  return (
    <div className="flex breathing">
      <img src={playImg} className="h-10" />
      <p className="font-bold ml-1 text-4xl italic text-[#ae7aff] logo-text">
        Nexus
      </p>
    </div>
  );
}

export default Logo;
