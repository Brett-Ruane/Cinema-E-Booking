import React, { useState, useEffect } from "react";
import "./SelectSeats.css";
import axios from "axios";

function SelectSeats() {
  const [xSeats, setXSeats] = useState([]);
  async function getNASeats() {
    await axios
      .get(
        `http://localhost:8080/api/showtime/getAllSeatsForShowtime?show_id=${localStorage.getItem(
          "show_id"
        )}`
      )
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setXSeats(data);
          console.log(data);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleButtonClick = () => {
    if (selectedSeats.length !== numOfSeats) alert("Must all seats first");
    else {
      const showId = localStorage.getItem("show_id");
      console.log(parseInt(showId, 10));
      const userExistsJSON = localStorage.getItem("CurrentUser");
      const userExists = JSON.parse(userExistsJSON);
      console.log(userExists);
      console.log(parseInt(userExists.u_id, 10));
      var numOfATicks = parseInt(localStorage.getItem("numOfATicks"), 10) || 0;
      var numOfCTicks = parseInt(localStorage.getItem("numOfCTicks"), 10) || 0;
      var numOfSTicks = parseInt(localStorage.getItem("numOfSTicks"), 10) || 0;

      const tickets = selectedSeats.map((seat, index) => {
        const [rowId, colId] = seat.split("-");
        let type = "";

        const getTicketType = () => {
          if (numOfATicks > 0) {
            numOfATicks--;
            return "adult";
          } else if (numOfCTicks > 0) {
            numOfCTicks--;
            return "child";
          } else if (numOfSTicks > 0) {
            numOfSTicks--;
            return "senior";
          }
        };

        type = getTicketType();

        return {
          t_id: 0,
          show_id: parseInt(showId, 10),
          u_id: parseInt(userExists.u_id, 10),
          type,
          o_id: 0,
          row_id: parseInt(rowId, 10),
          column_id: parseInt(colId, 10),
        };
      });
      console.log(tickets);
      localStorage.setItem("tickets", JSON.stringify(tickets));
      localStorage.setItem("selectedTickets", JSON.stringify(selectedSeats));
      window.location.href = `/confirmOrder`;
    }
  };
  const [selectedSeats, setSelectedSeats] = useState([]);
  console.log(selectedSeats);
  const numOfATicks = parseInt(localStorage.getItem("numOfATicks"), 10) || 0;
  const numOfCTicks = parseInt(localStorage.getItem("numOfCTicks"), 10) || 0;
  const numOfSTicks = parseInt(localStorage.getItem("numOfSTicks"), 10) || 0;
  const numOfSeats = numOfATicks + numOfCTicks + numOfSTicks;

  const toggleSeatSelection = (rowIndex, seatIndex) => {
    const seatKey = `${rowIndex}-${seatIndex}`;
    const isSeatUnavailable = xSeats.some((seat) => {
      const [bookedRow, bookedCol] = seat.split(",");
      return (
        rowIndex.toString() === bookedRow && seatIndex.toString() === bookedCol
      );
    });

    if (isSelected(seatKey)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => seat !== seatKey)
      );
    } else if (!isSeatUnavailable && selectedSeats.length < numOfSeats) {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatKey]);
    }
  };

  const isSelected = (seatKey) => {
    return selectedSeats.includes(seatKey);
  };

  const renderSeatRows = () => {
    const rows = [];

    for (let i = 0; i < 7; i++) {
      const row = (
        <div className="row" key={`row-${i}`}>
          {renderSeatsInRow(i)}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  const renderSeatsInRow = (rowIndex) => {
    const seats = [];

    for (let i = 0; i < 14; i++) {
      const seatKey = `${rowIndex}-${i}`;
      const isSeatSelected = isSelected(seatKey);
      const [seatRow, seatCol] = seatKey.split("-"); // Split current seat key

      const isSeatBooked = xSeats.some((seat) => {
        const [bookedRow, bookedCol] = seat.split(",");
        return seatRow === bookedRow && seatCol === bookedCol;
      });

      const seatClasses = `seat ${isSeatSelected ? "selected" : ""} ${
        isSeatBooked ? "unavailable" : ""
      }`;

      const seat = (
        <button
          className={seatClasses}
          onClick={() => toggleSeatSelection(rowIndex, i)}
          key={`seat-${i}`}
          disabled={!isSeatSelected && selectedSeats.length === numOfSeats}
        ></button>
      );

      seats.push(seat);
    }

    return seats;
  };

  useEffect(() => {
    getNASeats();
  }, []);

  return (
    <div>
      <p style={{fontSize:'30px', padding: '10px'}}>Select Seats</p>

      <div className="box-container">
        <div>Select {numOfSeats} seats:</div>
        <div className="seat-container">
          Front
          <div className="screen"></div>

          {/* Rows of seats */}
          {renderSeatRows()}
          <div style={{ padding: '10px'}} > Back</div>

          <ul className="seat-key">
            <li>
              <button className="seat"></button>
              <p>Available</p>
            </li>
            <li>
              <button className="seat selected"></button>
              <p>Selected</p>
            </li>
            <li>
              <button className="seat unavailable"></button>
              <p>Unavailable</p>
            </li>
          </ul>

          <div className="seat-location">
            Selected: {selectedSeats.map((seat) => `[${seat}]`).join(", ")}
          </div>
          <div className="footer">
            <a onClick={() => handleButtonClick()} className="footer-btn">
              Continue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectSeats;
