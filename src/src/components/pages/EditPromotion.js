/* page for editing promo */

import axios from "axios";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function EditPromotion() {
  const [optionList, setOptionList] = useState([]);
  const [select, setSelected] = useState("");
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/user/getAllPromo")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionList(data);
          if (data.length > 0) {
            setSelected(data[0].code);
            fetchPromo();
          }
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
    fetchPromo();
  }, []);

  useEffect(() => {
    if (select) {
      fetchPromo();
      console.log(promo);
    }
  }, [select]);

  const fetchPromo = () => {
    if (select) {
      axios
        .get(`http://localhost:8080/api/user/getPromo?code=${select}`)
        .then((response) => {
          const { data } = response;
          if (response.status === 200) {
            //check the api call is success by stats code 200,201 ...etc
            setPromoInfo(data);
            setPromo(data);
            console.log(data);
            console.log(promo);
            console.log(promoInfo);
          } else {
            //error handle section
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const [promoInfo, setPromoInfo] = useState([]);
  const [promo, setPromo] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(promo);
    // window.location.assign("http://localhost:3000/manage");
    // alert("Movie Added")
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/addPromo",
        promo
      );

      if (response.status === 200) {
        // Movie added successfully
        alert("Promo change successfully");
      } else {
        // Handle errors
        alert("Promo change Failed");
      }
    } catch (error) {
      alert("ERROR");
    }
    window.location.assign("http://localhost:3000/manage");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1 style={{ fontSize: "30px", color: "black", padding: "20px" }}>
        Edit Promo :
      </h1>
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: "black" }}>Select Promo to Edit</h1>
        <div classname="registerformat" style={{ padding: "20px" }}>
          <select
            disabled={false}
            value={select}
            onChange={(event) => {
              setSelected(event.currentTarget.value);
            }}
          >
            {optionList.map((item) => (
              <option key={item.p_id}>{item.code}</option>
            ))}
          </select>
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Code :<label></label>
          <input
            type="text"
            name="code"
            defaultValue={promoInfo.code}
            value={promo.code}
            onChange={(event) => {
              setPromo({
                ...promo,
                code: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Discount :<label></label>
          <input
            type="text"
            name="discount"
            defaultValue={promoInfo.discount}
            value={promo.discount}
            onChange={(event) => {
              setPromo({
                ...promo,
                discount: event.target.value,
              });
            }}
          />
          Decimal Value
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Date :<label></label>
          <input
            type="text"
            name="date"
            defaultValue={promoInfo.date}
            value={promo.date}
            onChange={(event) => {
              setPromo({
                ...promo,
                date: event.target.value,
              });
            }}
          />
        </div>
        
        <div style= {{padding: '20px',display: "flex", justifyContent: 'center'}}>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        </div>
      </form>
    </body>
  );
}
