import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const keyboardEvent = event;
      if (keyboardEvent.key === 'Enter') {
        console.log(query)
        navigate(`/search/${query}`);
      }
    };

    const node = inputRef.current;
    if (node) {
      node.addEventListener('keydown', handleKeyDown as EventListener);
      return () => {
        node.removeEventListener('keydown', handleKeyDown as EventListener);
      };
    }
  }, [query,navigate]);

  return (
    <div className="max-w-md mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg overflow-hidden bg-[#121212] border-white border">
        <div className="grid place-items-center h-full w-12 text-white bg-[#121212]">
          <Search />
        </div>
        <input
          ref={inputRef}
          className="bg-[#121212] peer h-full w-full outline-none text-sm text-white pr-2"
          type="text"
          id="search"
          placeholder="Search something.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
