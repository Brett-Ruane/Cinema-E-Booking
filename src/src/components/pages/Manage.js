/* page for managing movies */
import React from "react";
import HomeSearch from "./HomeSearch.js";
import HomeSearchFuture from "./HomeSearchFuture.js";
import axios from "axios";
import { useEffect, useState } from "react";
import ManageMovies from "./ManageMovies.js";

export default function Manage() {
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
    <body style={{ backgroundColor: 'crimson'}}>
      <div>
        <h1 style={{ padding: "30px", color: 'black', fontSize: '40px'}}>Manage Movies</h1>
      </div>
      <div className="Movies">
        
        <li style={{ paddingBottom: "10px" }}>
        <a href="/schedule" style={{ color: 'white'}}>
          Schedule Movies
        </a>
        </li>
        <li style={{ paddingBottom: "10px" }}>
        <a href="/addMovie" style={{ color: 'white'}}>
          Add Movies
        </a>
        </li>
        <li style={{ paddingBottom: "10px" }}>
        <a href="/deleteMovie" style={{ color: 'white'}}>
          Delete Movies
        </a>
        </li>
        <li style={{ paddingBottom: "10px" }}>
        <a href="/editMovie" style={{ color: 'white'}}>
          Edit Movies
        </a>
        </li>
        <h1 style={{ padding: "30px", color: 'white'}}>Movies</h1>
        <ManageMovies Data={data} />
        
      </div>
    </body>
  );
}
