/* page for adding promo */
import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddPromotion() {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [date, setDate] = useState("");
  const [promo, setPromo] = useState({
    code: "",
    date: "",
    discount: 0.0,
    t_id: 0,
    p_sent: 0,
  });

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleDateChange = (newDate) => {
    const month = (newDate.$M + 1).toString().padStart(2, "0");
    const dateString = `${newDate.$y}-${month}-${newDate.$D}`;
    setDate(dateString);
  };

  async function sendPromo(promoData) {
    console.log(promoData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/addPromo",
        promoData
      );
      if (response.status === 200) {
        alert("Promotion Added");
        window.location.assign("http://localhost:3000/managePromo");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      // Create a new promo object
      const updatedPromo = {
        ...promo,
        code: code,
        date: date,
        discount: discount,
      };
      await setPromo(updatedPromo);
      await sendPromo(updatedPromo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1 style={{ color: "black", fontSize: "40px" }}>Add Promo</h1>

      <div>
        <h2 style={{ color: "black" }}>Promo Code</h2>
        <div
          classname="registerformat"
          style={{ padding: "10px", color: "black" }}
        >
          Code :
          <input value={code} onChange={handleCodeChange} type="text"></input>
        </div>

        <div
          classname="registerformat"
          style={{ padding: "10px", color: "black" }}
        >
          Discount Amount :
          <input
            value={discount}
            onChange={handleDiscountChange}
            type="number"
          ></input>{" "}
          Decimal Value
        </div>

        <div
          classname="registerformat"
          style={{ display: "flex", justifyContent: 'center',padding: "10px", color: "black"}}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                variant="solid"
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div style= {{padding: '20px',display: "flex", justifyContent: 'center'}}>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        </div>

      </div>
    </body>
  );
}
