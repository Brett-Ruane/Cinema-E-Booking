/* page for sending Promotions*/

import axios from "axios";
import { useEffect, useState } from "react";

export default function SendPromotion() {
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/user/getAllPromo")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          // Filter promos where p_sent is equal to 0
          const filteredPromos = data.filter((promo) => promo.p_sent === 0);
          setOptionList(filteredPromos);
          if (filteredPromos.length > 0) {
            setSelected(filteredPromos[0].code);
          }
        } else {
          // Handle error section
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit() {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/email/sendPromo?code=${select}`
      );

      if (response.status === 200) {
        // Movie added successfully
        alert("Promotion Sent");
      } else {
        // Handle errors
        alert("Promo Send Failed");
      }
    } catch (error) {
      alert("ERROR");
    }
    window.location.assign("http://localhost:3000/sendPromotion");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1
        style={{ backgroundColor: "crimson", fontSize: "30px", color: "black" }}
      >
        Send Promotions
      </h1>

      <h1 style={{ padding: "10px", color: "black" }}>
        Select Promotion to Send
      </h1>
      <div classname="registerformat">
        <select
          disabled={false}
          value={select}
          onChange={(e) => setSelected(e.currentTarget.value)}
        >
          {optionList.map((item) => (
            <option key={item.p_id}>{item.code}</option>
          ))}
        </select>
      </div>

      <div
        style={{ padding: "20px", display: "flex", justifyContent: "center" }}
      >
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </body>
  );
}
