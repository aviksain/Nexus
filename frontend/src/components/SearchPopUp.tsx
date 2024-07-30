import { useState } from "react";
import { Button, Input } from ".";
import { useNavigate } from "react-router-dom";

export default function SearchPopUp({ show, setShow }: any) {
  if (!show) {
    return null;
  }

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const onSubmit = () => {
    if (query.trim() === "") return; // Prevent empty searches
    setShow(false);
    navigate(`/search/${encodeURIComponent(query)}`);
  }

  return (
    <>
      <div className="lg:hidden xl:hidden 2xl:hidden sm:hidden p-4">
        <Input value={query} onChange={(e)=> setQuery(e.target.value)}/>
        <Button onClick={onSubmit} disabled={query.trim() === ""}>Search</Button>
      </div>
    </>
  );
}
