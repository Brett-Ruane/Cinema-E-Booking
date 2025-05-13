import React, { useEffect } from "react";
import "./BuyTickets.css";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";

function BuyTickets() {
  const handleButtonClick = (date) => {
    localStorage.setItem("movieName", movieInfo.m_title);
    localStorage.setItem("movieId", movieInfo.m_id);
    localStorage.setItem("movieMark", movieInfo.m_mark);
    localStorage.setItem("date", date);
    window.location.href = `/pickTime`;
  };

  const currentURL = window.location.href;

  // Function to extract the parameter value from the URL
  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Extract the 'movieName' parameter
  const movieName = getParameterByName("movieName", currentURL);
  const [embeddedUrl, setEmbeddedUrl] = useState("");

  const fetchMovie = () => {
    axios
      .get(`http://localhost:8080/api/movie/getByName?m_title=${movieName}`)
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setMovieInfo(data);
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };
  const [movieInfo, setMovieInfo] = useState([]);
  const [showtimeInfo, setShowtimeInfo] = useState([]);
  const fetchShowtimes = () => {
    axios
      .get(
        `http://localhost:8080/api/showtime/getAllForMovie?m_id=${movieInfo.m_id}`
      )
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setShowtimeInfo(data);
          //check the api call is success by stats code 200,201 ...etc
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    if (movieInfo.m_id) fetchShowtimes();
    if (movieInfo && movieInfo.m_trailer) {
      const videoId = movieInfo.m_trailer.split("v=")[1]; // Extract the video ID from the link
      setEmbeddedUrl(`https://www.youtube.com/embed/${videoId}`);
    }
  }, [movieInfo]);
  return (
    <div>
        <div>
          <h1 style={{padding: '10px',fontSize:'30px'}}>SHOWTIMES</h1>
        </div>

        <div>
          <h1 className="movie-name">{movieInfo.m_title}</h1>
        </div>

        <div className="showtimes-body">
          <div className="showtimes-dates-container">
            {[...new Set(showtimeInfo.map((e) => e.date))].map((uniqueDate) => (
              <Button
                onClick={() => handleButtonClick(uniqueDate)}
                className="whole-map"
              >
                <div className="showtimes-btn" key={uniqueDate}>
                  <div className="map-name">
                    <p className="">{uniqueDate}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

      <div className="trailer-container">
        <iframe
          className="trailer"
          width="600px"
          height="400px"
          src={embeddedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
        ></iframe>
      </div>

      <div className="container">
          <div style={{padding :'10px'}}>{movieInfo.m_title}</div>
          <div style={{padding :'10px'}}>Age Rating: {movieInfo.m_mark}</div>
          <div style={{padding :'10px'}}>Producer: {movieInfo.m_producer}</div>
          <div style={{padding :'10px'}}>Cast: {movieInfo.m_cast} . . .</div>
          <div style={{padding :'10px'}}>{movieInfo.m_synopsis}</div>
      </div>

    </div>
  );
}

export default BuyTickets;
