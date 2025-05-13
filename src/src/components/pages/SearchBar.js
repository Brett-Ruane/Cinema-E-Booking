/* search bar component */
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
export default function SearchBar() {
  const [Data, setData] = useState([]);
  const isC = localStorage.getItem("isCustomer");
  const isCustomer = !!parseInt(isC, 10);

  useEffect(() => {
    // Make a GET request to your API or server
    axios
      .get("http://localhost:8080/api/movie/getAll") // Update the URL as per your API endpoint
      .then((response) => {
        // Handle the successful response and update the state
        setData(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
      });
  }, []);

  const [map_data, setmap_data] = useState(Data);

  useEffect(() => {
    // Initialize map_data when Data changes
    setmap_data(Data);
  }, [Data]);

  // function searchdata(e) {
  //   var i, td, filter, txtValue;
  //   filter = e.target.value.toLowerCase();
  //   var show_datas = [];
  //   for (i = 0; i < Data.length; i++) {
  //     td = Data[i];
  //     if (td && td.m_title && td.m_showing) {
  //       txtValue = td.m_title;
  //       if (txtValue.toLowerCase().indexOf(filter) > -1) {
  //         show_datas.push(Data[i]);
  //       }
  //     }
  //   }
  //   var arr = show_datas.filter(function (item, index, inputArray) {
  //     return inputArray.indexOf(item) === index;
  //   });

  //   // Update map_data directly to trigger re-render
  //   setmap_data(arr);
  // }

  function searchdata(e) {
    var i, td, filter, txtValue;
    filter = e.target.value.toLowerCase();
    var show_datas = [];
    for (i = 0; i < Data.length; i++) {
      td = Data[i];
      if (td && td.m_title && td.m_category) {
        txtValue = td.m_title + td.m_category;
        if (txtValue.toLowerCase().includes(filter)) {
          show_datas.push(Data[i]);
        }
      }
    }
    var arr = show_datas.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) === index;
    });

    setmap_data(arr);
  }

  return (
    <>
      <div>Search</div>
      <div className="search-bar">
        <input type="search" onChange={searchdata}></input>
      </div>
      <div  style={{display: "flex",justifyContent: "center",alignItems: "center",}}className="whole-map">
        {map_data.map((e) => (
          <div
            style={{ background: "black", border: "black" }}
            key={e.id}
            className="map-data"
          >
            <Card sx={{ maxWidth: 345, maxHeight: 400, background: "crimson" }}>
              <a
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "crimson",
                  padding: "10px",
                }}
                href={
                  isCustomer ? `/buyTickets?movieName=${e.m_title}` : `/login`
                }
              >
                <button> Buy Tickets</button>
              </a>
              <CardActionArea>
                <CardMedia component="img" height="200" image={e.m_poster} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <div className="map-name">
                      <p className="">{e.m_title}</p>
                    </div>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.m_synopsis}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
