import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ArtistList from "./components/ArtistList.jsx";
import "./App.css";

function App() {
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/artist");
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artist", error);
      }
    };

    fetchArtist();
  }, [searchQuery]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = () => {
    fetchArtist();
  };

  return (
    <>
      <h1>Artist Collection</h1>
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onSubmit={handleSubmit}
      />
      {artists.length > 0 && <ArtistList artists={artists} />}
    </>
  );
}

export default App;
