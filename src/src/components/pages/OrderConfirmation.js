import React, { useEffect } from "react";
import "./OrderConfirmation.css";
import axios from "axios";
import _ from "lodash";

const OrderConfirmation = () => {
  const sendEmail = _.once(async () => {
    await axios
      .post(
        `http://localhost:8080/api/email/send-confirmation-email?u_email=${localStorage.getItem(
          "userEmail"
        )}&o_id=${localStorage.getItem(
          "orderId"
        )}&a=${numOfATicks}&c=${numOfCTicks}&s=${numOfSTicks}&total=${grandTotal}&movieName=${localStorage.getItem(
          "movieName"
        )}&date=${localStorage.getItem("date")}&time=${localStorage.getItem(
          "time"
        )}`
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Confirmation email sent");
        } else {
          // Handle other status codes if needed
        }
      })
      .catch((error) => {});
  });
  useEffect(() => {
    sendEmail();
  }, []);
  const numOfATicks = parseInt(localStorage.getItem("numOfATicks"), 10) || 0;
  const numOfCTicks = parseInt(localStorage.getItem("numOfCTicks"), 10) || 0;
  const numOfSTicks = parseInt(localStorage.getItem("numOfSTicks"), 10) || 0;
  const promo = parseFloat(localStorage.getItem("promo"), 10) || 0;
  const total = numOfATicks * 9 + numOfCTicks * 6.5 + numOfSTicks * 7 + 3;
  const totalWithTax = 1.07 * total;
  const grandTotal = ((1 - promo) * totalWithTax).toFixed(2);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
      className="container"
    >
      <div className="confirmation">
        <p className="confirmation-number">
          Order Number: {localStorage.getItem("orderId")}
        </p>
        <p className="confirmation-message">Your order was successful!</p>
      </div>

      <div style={{ display: "flex", justifyContent: "left" }}>
        <div className="promo-code-detail">
          <h3>Thanks For Supporting ABC! </h3>
          <p>Check your email for a confirmation</p>
        </div>

        <div className="item-total-container">
          <div className="items">
            <h1 style={{ display: "flex", paddingBottom: "40px" }}>Tickets</h1>
            <p>Adult x {numOfATicks}</p>
            <p>Child x {numOfCTicks}</p>
            <p>Senior x {numOfSTicks}</p>
            <p>Service</p>
            <p>Taxes</p>
            <hr />
            <p style={{ paddingTop: "10px" }}>Total</p>
          </div>

          <div className="prices">
            <h1 style={{ paddingBottom: "40px" }}>Price</h1>
            <p>${numOfATicks * 9}</p>
            <p>${numOfCTicks * 6.5}</p>
            <p>${numOfSTicks * 7}</p>
            <p>$3</p>
            <p>${(totalWithTax - total).toFixed(2)}</p>
            <hr />
            <p style={{ paddingTop: "10px" }}>${grandTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
