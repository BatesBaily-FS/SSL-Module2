import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [newArtistYearBorn, setNewArtistYearBorn] = useState("");
  const [newArtistMedium, setNewArtistMedium] = useState("");

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  const handleSearchInputChange = (evt) => {
    setSearchQuery(evt.target.value);
  };

  const handleAddArtistSubmit = (evt) => {
    evt.preventDefault();

    setNewArtistName("");
    setNewArtistMedium("");
    setNewArtistYearBorn("");
  };

  const handleNewArtistNameChange = (evt) => {
    setNewArtistName(evt.target.value);
  };

  const handleNewArtistYearBornChange = (evt) => {
    setNewArtistYearBorn(evt.target.value);
  };

  const handleNewArtistMediumChange = (evt) => {
    setNewArtistMedium(evt.target.value);
  };

  return (
    <>
      <h3>Find Artist</h3>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Artist name"
          id="search"
          name="name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />

        {searchQuery.length < 3 && (
          <p>Search must be at least 3 characters long</p>
        )}
        <button type="submit">Search</button>
      </form>

      <h3>Add Artist</h3>
      <form onSubmit={handleAddArtistSubmit}>
        <input
          type="text"
          placeholder="Artist name"
          id="newArtistName"
          name="name"
          value={newArtistName}
          onChange={handleNewArtistNameChange}
        />
        <input
          type="text"
          placeholder="year artist was born"
          id="newArtistYearBorn"
          name="yearBorn"
          value={newArtistYearBorn}
          onChange={handleNewArtistYearBornChange}
        />
        <input
          type="text"
          placeholder="Artist medium of choice"
          id="search"
          name="newArtistMedium"
          value={newArtistMedium}
          onChange={handleNewArtistMediumChange}
        />
        {searchQuery.length < 3 && (
          <p>
            Artist name, year born, and medium must be at least 3 characters
            long
          </p>
        )}
        <button type="submit">Search</button>
      </form>
    </>
  );
}
export default SearchBar;
