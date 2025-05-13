import { useState, useEffect } from "react";
import axios from "axios";

export default function PayHistory() {
  const [orderList, setOrderList] = useState([]);
  const userExistsJSON = localStorage.getItem("CurrentUser");
  const userExists = JSON.parse(userExistsJSON);

  const u_id = userExists.u_id;

  const fetchOrders = () => {
    axios
      .get(`http://localhost:8080/api/order/getAllForUser?u_id=${u_id}`)
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setOrderList(data);
        } else {
          // Handle error
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 style={{ background: "black", fontSize: "30px", padding: "30px" }}>
        Payment History
      </h1>

      <div
        style={{ textAlign: "left", padding: "30px", background: "crimson" }}
      >
        {orderList.map((order, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <div style={{ padding: "10px" }}>Order ID: {order.o_id}</div>
            <div style={{ padding: "10px" }}>Total: ${order.o_total}</div>
            <div style={{ padding: "10px" }}>Date Time: {order.o_datetime}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
