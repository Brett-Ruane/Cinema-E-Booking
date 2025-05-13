/* page for deleting movies */

import axios from "axios";
import { useEffect, useState } from "react";

export default function DeletePromotion() {
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
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
          }
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    axios.post(`http://localhost:8080/api/user/deletePromo?code=${select}`);
    alert("Promo Deleted");
    window.location.assign("http://localhost:3000/deletePromotion");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1
        style={{
          padding: "20px",
          backgroundColor: "crimson",
          fontSize: "30px",
          color: "black",
        }}
      >
        Delete Promos
      </h1>

      <form onSubmit={handleSubmit}>
        <h1 style={{ padding: "10px", color: "black" }}>
          Select Promo to Delete
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
      </form>
    </body>
  );
}
