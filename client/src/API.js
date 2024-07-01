import axios from "axios";
const API = {};

API.fetchArtists = async () => {
  const response = await axios.get("http:localhost:3000/api/v1/artist");
  console.log(">>>", response);
  return response.data;
};

API.findArtist = async (artist) => {
  const response = await axios.post(
    "http:localhost:3000/api/v1/artist",
    artist
  );
  console.log(">>>", response);
  return response.data;
};

export default API;
