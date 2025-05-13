import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteMovies() {
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/movie/getAll")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setOptionList(data);
          if (data.length > 0) {
            setSelected(data[0].u_name);
          }
        } else {
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit() {
    axios.post(`http://localhost:8080/api/movie/delete?movieName=${select}`);
    alert("Movie Deleted");
    window.location.assign("http://localhost:3000/deleteMovie");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1
        style={{ backgroundColor: "crimson", fontSize: "30px", color: "black" }}
      >
        Delete Movies
      </h1>

      <form onSubmit={handleSubmit}>
        <h1 style={{ padding: "20px", color: "black" }}>
          Select Movie to Delete
        </h1>
        <div classname="registerformat">
          <select
            disabled={false}
            value={select}
            onChange={(e) => setSelected(e.currentTarget.value)}
          >
            {optionList.map((item) => (
              <option key={item.m_id}>{item.m_title}</option>
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
