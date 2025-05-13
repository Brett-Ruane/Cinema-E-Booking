/* page for adding Admins */

import axios from "axios";
import { useEffect, useState } from "react";

export default function AddAdmin() {
  const [optionList, setOptionList] = useState([]);
  const [select, setSelected] = useState("");
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/user/getAll")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          // Filter users where u_role is equal to 0
          const filteredUsers = data.filter((user) => user.u_role === 0);
          setOptionList(filteredUsers);
          if (filteredUsers.length > 0) {
            setSelected(filteredUsers[0].u_name);
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

  async function handleSubmit(e) {
    axios.post(`http://localhost:8080/api/user/promote?u_name=${select}`);
    alert(select + " has been Promoted");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "crimson",
          fontSize: "30px",
          color: "black",
        }}
      >
        Promote Users
      </h1>

      <form onSubmit={handleSubmit}>
        <h1
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            color: "black",
          }}
        >
          Select User to Promote
        </h1>
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
