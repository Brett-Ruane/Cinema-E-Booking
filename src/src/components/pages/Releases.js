import React from "react";
import "./Releases.css";
import HomeSearch from "./HomeSearch.js";
import HomeSearchFuture from "./HomeSearchFuture.js";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Releases() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to your API or server
    axios
      .get("http://localhost:8080/api/movie/getAll") // Update the URL as per your API endpoint
      .then((response) => {
        // Handle the successful response and update the state
        setData(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <body style={{background: 'black'}}>
      <div className="movie-container">
          <h1 style={{color: 'white', fontSize: '30px', padding: '30px'}}>Now Playing</h1>

        <HomeSearch Data={data} />

          <h1 style={{color: 'white', fontSize: '30px', padding: '30px'}}>Coming Soon</h1>
        <HomeSearchFuture Data={data} />
      </div>
    </body>
  );
}
