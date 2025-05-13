/* page for Banning user */
import axios from "axios";
import { useEffect, useState } from "react";

export default function BanUsers() {
  const [optionList, setOptionList] = useState([]);
  const [select, setSelected] = useState("");
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/user/getAll")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionList(data);
          if (data.length > 0) {
            setSelected(data[0].u_name);
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
    axios.post(`http://localhost:8080/api/user/ban?u_name=${select}`);
    alert(select + " has been Banned");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1
        style={{ padding: '20px',display: "flex", justifyContent: 'center',backgroundColor: "crimson", fontSize: "30px", color: "black" }}
      >
        Ban Users
      </h1>

      <form onSubmit={handleSubmit}>
        <h1 style={{ padding: '20px',display: "flex", justifyContent: 'center',color: "black" }}>Select User to Ban</h1>
        <div classname="registerformat">
          <select
            disabled={false}
            value={select}
            onChange={(e) => setSelected(e.currentTarget.value)}
          >
            {optionList.map((item) => (
              <option key={item.u_id}>{item.u_name}</option>
            ))}
          </select>
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
