import react from "react";

function Artist(artist) {
  const { name, yearBorn, medium, description } = artist;
  return (
    <>
      <h3>{name}</h3>
      <p>{yearBorn}</p>
      <p>{medium}</p>
      <p>{description}</p>
    </>
  );
}

export default Artist;
