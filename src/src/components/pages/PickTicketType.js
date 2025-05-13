import React, { useState, useEffect } from "react";
import "./PickTicketType.css";

function PickTicketType() {
  const handleButtonClick = () => {
    if (adult + child + senior === 0) alert("Must choose tickets first");
    else {
      localStorage.setItem("numOfATicks", adult);
      localStorage.setItem("numOfCTicks", child);
      localStorage.setItem("numOfSTicks", senior);
      window.location.href = `/selectSeats`;
    }
  };
  const movieName = localStorage.getItem("movieName");
  const movieId = localStorage.getItem("movieId");
  const movieMark = localStorage.getItem("movieMark");
  const date = localStorage.getItem("date");
  const time = localStorage.getItem("time");
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [senior, setSenior] = useState(0);

  const handleIncrement = (type) => {
    if (type === "a") setAdult(adult + 1);
    else if (type === "c") setChild(child + 1);
    else if (type === "s") setSenior(senior + 1);
  };

  const handleDecrement = (type) => {
    if (type === "a") setAdult(Math.max(adult - 1, 0));
    else if (type === "c") setChild(Math.max(child - 1, 0));
    else if (type === "s") setSenior(Math.max(senior - 1, 0));
  };

  function convertToAMPM(timeString) {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  }

  return (
    <div>

      <div>
        <p style={{fontSize: '30px', padding: '20px'}}>Pick Ticket Type</p>
      </div>

          <div style={{fontSize:'20px'}}>{movieName}</div>
          <div className="movie-info">
            ABC Athens GA | {date} | {convertToAMPM(time)}
          </div>

        <div style={{padding: '20px'}} className="ticketSelection">

          <div style={{display: 'flex', flexDirection:'row', justifyContent: 'center', padding: '15px'}}>

            <button style={{height: '40px', width: '30px'}} onClick={() => handleDecrement("a")}>
               -
            </button>

            <div style={{paddingLeft:'10px', paddingRight: '10px'}}>
            <p>Adult Ticket</p>
            <p>$9.00</p>
            </div>

            <button style={{height: '40px', width: '30px'}} onClick={() => handleIncrement("a")}>
              +
            </button>

          </div>

          <div style={{display: 'flex', flexDirection:'row', justifyContent: 'center', padding:'20px'}}>

            <button style={{height: '40px', width: '30px'}} onClick={() => handleDecrement("c")}>
              -
            </button>

            <div style={{paddingLeft:'10px', paddingRight: '10px'}}>
              <p>Child Ticket</p>
              <p>$6.50</p>
            </div>

            <button style={{height: '40px', width: '30px'}} onClick={() => handleIncrement("c")}>
              +
            </button>

          </div>

          <div style={{display: 'flex', flexDirection:'row', justifyContent: 'center', padding: '20px'}}>

            <button style={{height: '40px', width: '30px'}} onClick={() => handleDecrement("s")}>
              -
            </button>
            
            <div style={{paddingLeft:'10px', paddingRight: '10px'}}>
              <p>Senior Ticket</p>
              <p>$7.00</p>
            </div>

            <button style={{height: '40px', width: '30px'}} onClick={() => handleIncrement("s")}>
              +
            </button>

          </div>

        </div>

        <div style={{paddingBottom:'30px'}}>
          <p>Tickets Selected: </p>
          <br />
          <p>Adult Tickets: {adult}</p>
          <p>Child Tickets: {child}</p>
          <p>Senior Tickets: {senior}</p>
          <div style={{display: 'flex', justifyContent: "center",padding:'30px'}}>
          <button className="btn" onClick={() => handleButtonClick()}>
            Continue
          </button>
          </div>
        </div>

        
      </div>
  );
}

export default PickTicketType;
