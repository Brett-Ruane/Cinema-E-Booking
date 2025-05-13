/* page for managing promo */
import axios from "axios";
import { useEffect, useState } from "react";

export default function ManagePromo() {
    const [data, setData] = useState([]);
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
    return (
    
    <body style={{backgroundColor: 'crimson', padding: '30px'}}>
    <h1  style={{fontSize: '30px', padding: '30px', color: 'black'}}>Manage Promo</h1>
    <li style={{ padding: "10px" }}>
        <a href="/addPromotion" style={{ color: 'white'}}>
          Add Promotions
        </a>
    </li>
    <li style={{ padding: "10px" }}>
        <a href="/deletePromotion" style={{ color: 'white'}}>
          Delete Promotions
        </a>
    </li>
    <li style={{ padding: "10px" }}>
        <a href="/editPromotion" style={{ color: 'white'}}>
          Edit Promotions
        </a>
    </li>
    <li style={{ padding: "10px" }}>
        <a href="/sendPromotion" style={{ color: 'white'}}>
          Send Promotions
        </a>
    </li>
    
    </body>
    
    
    )
}