import React, { useState, useEffect } from "react";
import "./Checkout.css";
import axios from "axios";

const Checkout = () => {
  const [creditInfo, setCreditInfo] = useState(["0", "0", "0"]);
  useEffect(() => {
    getCreditInfo(userExists);
  }, []);

  useEffect(() => {
    console.log(creditInfo);
  }, [creditInfo]);

  const [promo, setPromo] = useState(0);
  async function getCreditInfo(userExists) {
    await axios
      .get(
        `http://localhost:8080/api/user/getDecryptCredit?u_email=${userExists.u_email}`
      )
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setCreditInfo(data);
          console.log(data);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //setCreditInfo(JSON.stringify(creditDecryptNonData.data));
  }
  async function getPromoInfo(code) {
    await axios
      .get(`http://localhost:8080/api/user/getPromo?code=${code}`)
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          if (data) {
            console.log("data", data);
            setPromo(data.discount);
            localStorage.setItem("promo", promo);
            alert("Promo Applied");
          } else {
            setPromo(0);
            alert("Invalid code");
          }
          //check the api call is success by stats code 200,201 ...etc
        } else {
          setPromo(0);
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  }

  async function purchase(index) {
    console.log(parseInt(cardCVV, 10));
    console.log(userExists.credit_sc1);
    console.log(index);
    if (
      (index === 0 && parseInt(cardCVV, 10) === userExists.credit_sc1) ||
      (index === 1 && parseInt(cardCVV, 10) === userExists.credit_sc2) ||
      (index === 2 && parseInt(cardCVV, 10) === userExists.credit_sc3) ||
      index === 4
    ) {
      const tickets = localStorage.getItem("tickets");
      console.log(tickets);
      const order = JSON.parse(tickets);
      console.log(order);
      const currentTime = new Date().toISOString();
      await axios
        .post("http://localhost:8080/api/order/create-order", order, {
          params: {
            total: ((1 - promo) * totalWithTax).toFixed(2),
            u_id: localStorage.getItem("userId"),
            o_datetime: currentTime,
          },
        })
        .then((response) => {
          const { data } = response;
          if (response.status === 200) {
            const o_id = data.o_id;
            localStorage.setItem("orderId", o_id);
            window.location.href = `/orderConfirmation`;
          } else {
            // Handle other status codes if needed
          }
        })
        .catch((error) => {});
    } else {
      alert("CVV is incorrect");
    }
  }
  const userExistsJSON = localStorage.getItem("CurrentUser");
  const userExists = JSON.parse(userExistsJSON);
  console.log(userExists);
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
  const [promoCode, setPromoCode] = useState("");
  const [cardCVV, setCardCVV] = useState();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("visa");
  const [cardExpDate, setCardExpDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [useAddressAsBilling, setUseAddressAsBilling] = useState(false);
  const date = localStorage.getItem("date");
  const time = localStorage.getItem("time");
  const numOfATicks = parseInt(localStorage.getItem("numOfATicks"), 10) || 0;
  const numOfCTicks = parseInt(localStorage.getItem("numOfCTicks"), 10) || 0;
  const numOfSTicks = parseInt(localStorage.getItem("numOfSTicks"), 10) || 0;
  const total = numOfATicks * 9 + numOfCTicks * 6.5 + numOfSTicks * 7 + 3;
  const totalWithTax = 1.07 * total;
  const grandTotal = ((1 - promo) * totalWithTax).toFixed(2);

  const [newCardCVV, setNewCardCVV] = useState(0);
  const [newCardName, setNewCardName] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpDate, setNewCardExpDate] = useState("");

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleCardCVVChange = (event) => {
    setCardCVV(event.target.value);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardExpDateChange = (event) => {
    setCardExpDate(event.target.value);
  };

  const handleNewCardCVVChange = (event) => {
    setNewCardCVV(event.target.value);
  };

  const handleNewCardNameChange = (event) => {
    setNewCardName(event.target.value);
  };

  const handleNewCardNumberChange = (event) => {
    setNewCardNumber(event.target.value);
  };

  const handleNewCardExpDateChange = (event) => {
    setNewCardExpDate(event.target.value);
  };

  const handleAddNewCard = () => {
    let cardIndex = 1;
    while (creditInfo[cardIndex - 1] !== "" && cardIndex <= 3) {
      cardIndex++;
    }

    // If an available credit_numberX is found, update the user
    if (cardIndex <= 3) {
      axios.post(
        `http://localhost:8080/api/user/addCard?u_email=${userExists.u_email}&credit_number=${newCardNumber}&credit_date=${newCardExpDate}&credit_sc=${newCardCVV}&credit_name=${newCardName}&cardNum=${cardIndex}`
      );
      alert(`Added new card to credit_number${cardIndex}`);
      purchase(4);
    } else {
      alert("Maximum card limit reached");
    }
  };
  return (
    <div>
      <div>
        <p class="navbar-title">Checkout</p>
      </div>

      <div>
        <div>{localStorage.getItem("movieName")}</div>
        <div>
          ABC Athens GA | {date} | {convertToAMPM(time)}
        </div>
      </div>

      <div className="content-container">
        <div className="left-container">
          <div className="existing-payment">
            Enter Promo Code
            <div style={{ width: "500px" }} className="change">
              Promo Code:
              <div className="input-group">
                <input
                  type="text"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                />
              </div>
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => getPromoInfo(promoCode)}
                className="update-btn"
              >
                Apply
              </button>
            </div>
            <div style={{ width: "400px" }} className="payment-section">
              <br />
              Select Payment Method
              {userExists &&
              ((creditInfo[0] !== "0" &&
                userExists.credit_date1 &&
                userExists.credit_sc1) ||
                (creditInfo[1] !== "0" &&
                  userExists.credit_date2 &&
                  userExists.credit_sc2) ||
                (creditInfo[2] !== "0" &&
                  userExists.credit_date3 &&
                  userExists.credit_sc3)) ? (
                <div>
                  {creditInfo[0] !== "0" &&
                    userExists.credit_date1 &&
                    userExists.credit_sc1 && (
                      <div className="change">
                        <p>
                          Card 1: ************
                          {creditInfo[0].slice(-4)}
                        </p>
                        <br />
                        <div className="input-group">
                          CVV :
                          <input
                            type="number"
                            value={cardCVV}
                            onChange={handleCardCVVChange}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => purchase(0)}
                            className="update-btn"
                          >
                            Purchase
                          </button>
                        </div>
                      </div>
                    )}
                  {creditInfo[1] !== "0" &&
                    userExists.credit_date2 &&
                    userExists.credit_sc2 && (
                      <div className="change">
                        <p>
                          Card 2: ************
                          {creditInfo[1].slice(-4)}
                        </p>
                        <br />
                        <div className="input-group">
                          CVV :
                          <input
                            type="number"
                            value={cardCVV}
                            onChange={handleCardCVVChange}
                          />
                        </div>
                        <button
                          onClick={() => purchase(1)}
                          className="update-btn"
                        >
                          Purchase
                        </button>
                      </div>
                    )}
                  {creditInfo[2] !== "0" &&
                    userExists.credit_date3 &&
                    userExists.credit_sc3 && (
                      <div className="change">
                        <p>
                          Card 3: ************
                          {creditInfo[2].slice(-4)}
                        </p>
                        <br />
                        <div className="input-group">
                          CVV :
                          <input
                            type="number"
                            value={cardCVV}
                            onChange={handleCardCVVChange}
                          />
                        </div>
                        <button
                          onClick={() => purchase(2)}
                          className="update-btn"
                        >
                          Purchase
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                <p>No cards exist</p>
              )}
            </div>
          </div>
          <div className="update">
            {(creditInfo[0] !== "0" &&
              userExists.credit_date1 &&
              userExists.credit_sc1) ||
            (creditInfo[1] !== "0" &&
              userExists.credit_date2 &&
              userExists.credit_sc2) ||
            (creditInfo[2] !== "0" &&
              userExists.credit_date3 &&
              userExists.credit_sc3) ? (
              <div>
                <h3>New Payment Information</h3>
                <div className="change">
                  <div style={{ fontSize: "20px" }}>
                    Name:
                    <input
                      type="text"
                      id="card_Name"
                      value={newCardName}
                      onChange={handleNewCardNameChange}
                    />
                  </div>
                  <div>
                    Card Number :
                    <input
                      type="text"
                      id="card_Num"
                      value={newCardNumber}
                      onChange={handleNewCardNumberChange}
                    />
                  </div>
                  <div className="select-group"></div>
                  <br />
                  <div className="expiration">
                    Expiration Date :
                    <input
                      style={{ paddingLeft: "10px" }}
                      type="text"
                      id="card_ExpDate"
                      placeholder="MM/YY"
                      value={newCardExpDate}
                      onChange={handleNewCardExpDateChange}
                    />
                  </div>
                  <div className="expiration">
                    <label>CVV : </label>
                    <input
                      type="text"
                      placeholder=""
                      value={newCardCVV}
                      onChange={handleNewCardCVVChange}
                    />
                  </div>
                  <button
                    onClick={() => handleAddNewCard()}
                    className="update-btn"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ) : (
              <p>Max 3 cards</p>
            )}
          </div>
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
            <a href="checkout" className="footer-btn">
              Purchase
            </a>
          </div>

          <div className="prices">
            <h1 style={{ paddingBottom: "40px" }}>
              <a href="pickTicketType">Edit</a>
            </h1>
            <p>${numOfATicks * 9}</p>
            <p>${numOfCTicks * 6.5}</p>
            <p>${numOfSTicks * 7}</p>
            <p>$3</p>
            <p>${(totalWithTax - total).toFixed(2)}</p>
            <hr />
            <p style={{ paddingTop: "10px" }}>${grandTotal}</p>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    </div>
  );
};

export default Checkout;
