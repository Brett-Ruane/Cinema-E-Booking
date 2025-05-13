import axios from "axios";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function EditUsers() {
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
            fetchUser();
          }
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  useEffect(() => {
    if (select) {
      fetchUser();
      console.log(user);
    }
  }, [select]);

  const fetchUser = () => {
    if (select) {
      axios
        .get(`http://localhost:8080/api/user/getUserByName?u_name=${select}`)
        .then((response) => {
          const { data } = response;
          if (response.status === 200) {
            //check the api call is success by stats code 200,201 ...etc
            setUserInfo(data);
            setUser(data);
            console.log(data);
            console.log(user);
            console.log(userInfo);
          } else {
            //error handle section
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    // window.location.assign("http://localhost:3000/manage");
    // alert("Movie Added")
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/addNoE",
        user
      );

      if (response.status === 200) {
        // Movie added successfully
        alert("User change successfully");
      } else {
        // Handle errors
        alert("User change Failed");
      }
    } catch (error) {
      alert("ERROR");
    }
    window.location.assign("http://localhost:3000/manageUser");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1 style={{ fontSize: "30px", color: "black", padding: "20px" }}>
        Edit User :
      </h1>

      <div classname="registerformat" style={{ padding: "20px" }}>
        <h1 style={{ padding: "10px", color: "black" }}>Select User to Edit</h1>
        <select
          disabled={false}
          value={select}
          onChange={(event) => {
            setSelected(event.currentTarget.value);
          }}
        >
          {optionList.map((item) => (
            <option key={item.u_id}>{item.u_name}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            u_mark:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_mark: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.u_mark}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            First Name:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_firstname: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.u_firstname}
            />
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Last Name:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_lastname: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.u_lastname}
            />
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Username:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_name: event.target.value,
                });
              }}
              type="username"
              defaultValue={userInfo.u_name}
            />
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Phone Number:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_phone: event.target.value,
                });
              }}
              type="tel"
              defaultValue={userInfo.u_phone}
            />
          </label>
        </div>

        <h1 style={{ paddingBottom: "10px" }}>Home Address</h1>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Street:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_address1: event.target.value,
                });
              }}
              defaultValue={userInfo.credit_address1}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Zip:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_zip1: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_zip1}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            City:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_city1: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_city1}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            State:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_state1: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_state1}
            />
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Receive Promotion{" "}
            <input
              onChange={(event) => {
                const value = event.target.checked ? 1 : 0;
                setUser({
                  ...user,
                  u_promo: value,
                });
              }}
              type="checkbox"
              defaultChecked={userInfo.u_promo}
            />
          </label>
        </div>
        {/* <h1 style={{ paddingBottom: "10px" }}>Card 1</h1>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Number:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_number1: event.target.value,
                });
              }}
              type="name"
              //   defaultValue={creditInfo[0]}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Expiration Date:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_date1: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_date1}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Security number:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_sc1: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_sc1}
            />
          </label>
        </div>
        <h1 style={{ paddingBottom: "10px" }}>Card 2</h1>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Number:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_number2: event.target.value,
                });
              }}
              type="name"
              //   defaultValue={creditInfo[1]}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Expiration Date:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_date2: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_date2}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Security number:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_sc2: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_sc2}
            />
          </label>
        </div>
        <h1 style={{ paddingBottom: "10px" }}>Card 3</h1>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Number:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_number3: event.target.value,
                });
              }}
              type="name"
              //   defaultValue={creditInfo[2]}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Expiration Date:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_date3: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_date3}
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Security number:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_sc3: event.target.value,
                });
              }}
              type="name"
              defaultValue={userInfo.credit_sc3}
            />
          </label>
        </div> */}

        <div style={{ paddingBottom: "20px" }}>
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Confirm Changes
          </button>
        </div>
      </form>
    </body>
  );
}
