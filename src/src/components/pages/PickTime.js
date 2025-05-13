import React, { useEffect } from "react";
import "./BuyTickets.css";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";

function PickTime() {
  const handleButtonClick = (currentDate, show_id) => {
    const hours = `0${currentDate.getHours()}`.slice(-2);
    const minutes = `0${currentDate.getMinutes()}`.slice(-2);
    const seconds = `0${currentDate.getSeconds()}`.slice(-2);
    const timeString = `${hours}:${minutes}:${seconds}`;
    console.log(timeString);
    localStorage.setItem("time", timeString);
    localStorage.setItem("show_id", show_id);
    window.location.href = `/pickTicketType`;
  };
  const movieName = localStorage.getItem("movieName");
  const movieId = localStorage.getItem("movieId");
  const movieMark = localStorage.getItem("movieMark");
  const date = localStorage.getItem("date");

  const [showtimeInfo, setShowtimeInfo] = useState([]);
  const fetchShowtimes = () => {
    axios
      .get(
        `http://localhost:8080/api/showtime/getAllForDate?m_id=${movieId}&date=${date}`
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
    if (movieId) {
      fetchShowtimes();
    }
  }, []);
  return (
    <div className="fullSpace">
      <div className="navbar">
        <div className="navbar-container">
          <p className="navbar-title">SHOWTIMES</p>
        </div>
      </div>

      <div className="showtimes-body-container">
        <div className="showtimes-header">
          <p className="movie-name">{movieName}</p>
        </div>

        <div className="showtimes-body">
          <div className="showtimes-container">
            <p className="crimson-title">Select a Showtime: </p>
            <div className="showtimes-dates-container">
              {[...new Set(showtimeInfo.map((e) => e.time))]
                .map((uniqueTime) => {
                  const [hours, minutes, seconds] = uniqueTime
                    .split(":")
                    .map(Number);
                  const selectedShow = showtimeInfo.find((show) => {
                    const [showHours, showMinutes, showSeconds] = show.time
                      .split(":")
                      .map(Number);
                    return (
                      showHours === hours &&
                      showMinutes === minutes &&
                      showSeconds === seconds
                    );
                  });

                  return {
                    time: new Date(2023, 0, 1, hours, minutes, seconds),
                    show_id: selectedShow ? selectedShow.show_id : null,
                  };
                })
                .filter((show) => show.show_id) // Filter out null show_ids
                .sort((a, b) => a.time - b.time)
                .map((sortedShow) => (
                  <Button
                    onClick={() =>
                      handleButtonClick(sortedShow.time, sortedShow.show_id)
                    }
                    className="whole-map"
                    key={sortedShow.time.toISOString()}
                  >
                    <div className="showtimes-btn">
                      <div className="map-name">
                        <p>
                          {sortedShow.time.toLocaleTimeString([], {
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        {/* <a href="ticketType" className="continue">
          Continue <i className="fas fa-chevron-right"></i>
        </a> */}
      </div>
    </div>
  );
}

export default PickTime;
