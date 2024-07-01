import React, { useState, useEffect } from "react";
import Artist from "./Artist";

function ArtistList() {
  const [artist, setArtists] = useState([]);

  useEffect(() => {
    fetchArtist();
  }, []);

  const fetchArtist = async () => {
    try {
      console.log("Fetching artist from /api/v1/artist");
      const response = await fetch("/api/v1/artist");
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`error ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched artist data", data);
      setArtists(data);
    } catch (error) {
      console.error("Error fetching artist:", error);
    }
  };

  return (
    <>
      {artists.map((artist) => (
        <Artist artist={artist} key={artist._id} />
      ))}
    </>
  );
}

export default ArtistList;
