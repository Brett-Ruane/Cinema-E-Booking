import React from "react";
import "./ConfirmOrder.css"; // Import your CSS file

function ConfirmOrder() {
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
  const date = localStorage.getItem("date");
  const time = localStorage.getItem("time");
  const numOfATicks = parseInt(localStorage.getItem("numOfATicks"), 10) || 0;
  const numOfCTicks = parseInt(localStorage.getItem("numOfCTicks"), 10) || 0;
  const numOfSTicks = parseInt(localStorage.getItem("numOfSTicks"), 10) || 0;
  const total = numOfATicks * 9 + numOfCTicks * 6.5 + numOfSTicks * 7 + 3;
  const totalWithTax = 1.07 * total;

  return (
    <div>
      <p style={{padding:'10px'}} className="navbar-title">Confirm Order</p>

      <div className="movie-description">
        <div className="movie-info-container">
          <div className="movie-title">{localStorage.getItem("movieName")}</div>
          <div className="movie-info">
            ABC Athens GA | {date} | {convertToAMPM(time)}
          </div>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: "left"}}>
          <div className="promo-code-detail">
            <h3>Get Exclusive Deal! </h3>
            <p>Subscribe to ABC and get promo code to use at checkout</p>
            <div className="button-container"></div>
      </div>

          <div className="item-total-container">

            <div className="items">
              <h1 style={{display: 'flex', paddingBottom: '40px'}}>Tickets</h1>
              <p>Adult x {numOfATicks}</p>
              <p>Child x {numOfCTicks}</p>
              <p>Senior x {numOfSTicks}</p>
              <p>Service</p>
              <p>Taxes</p>
                <hr/>
              <p style={{paddingTop:'10px'}}>Total</p>
              <a href="checkout" className="footer-btn">
              Purchase
              </a>
            </div>

            <div className="prices">
              <h1 style={{paddingBottom: '40px'}}><a href="pickTicketType">Edit</a></h1>
              <p>${numOfATicks * 9}</p>
              <p>${numOfCTicks * 6.5}</p>
              <p>${numOfSTicks * 7}</p>
              <p>$3</p>
              <p>${(totalWithTax - total).toFixed(2)}</p>
                <hr/>
              <p style={{paddingTop:'10px'}}>${totalWithTax.toFixed(2)}</p>
            </div>
            
          </div>

        </div>

      <div style={{}}>
        
      </div>
    </div>
  );
}

export default ConfirmOrder;
