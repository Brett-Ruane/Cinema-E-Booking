/* page for registering for account */

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const userExistsJSON = localStorage.getItem("CurrentUser");
  const userExists = JSON.parse(userExistsJSON);
  const [user, setUser] = useState(userExists);
  const [creditInfo, setCreditInfo] = useState([]);

  useEffect(() => {
    fetchCredit();
  }, []);

  useEffect(() => {
    setUser({
      ...user,
      credit_number1: creditInfo[0],
      credit_number2: creditInfo[1],
      credit_number3: creditInfo[2],
    });
  }, [creditInfo]);
  async function fetchCredit() {
    await axios
      .get(
        `http://localhost:8080/api/user/getDecryptCredit?u_email=${userExists.u_email}`
      )
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setCreditInfo(data);
          console.log(data);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleSubmit(e) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /*
        if (u_firstname.length > 0) {
            alert('Invalid Password')
            return
        }
        if (u_lastname.length > 0) {
            alert('Invalid Password')
            return
        }
        if (u_username.length > 0) {
            alert('Invalid Password')
            return
        }
        if (re.test(u.email) == false) {
            alert('Invalid email')
            return
        }
        }
        */
    e.preventDefault();
    // const userData = await axios.get(
    //   `http://localhost:8080/api/user/getUserByEmail?u_email=${userExists.u_email}`
    // );
    // const user = userData.data;
    // await axios.post(`http://localhost:8080/api/user/change-profile-all`, user);
    console.log(user);
    await axios
      .post(`http://localhost:8080/api/user/change-profile-all`, user)
      .then((response) => {
        if (response.status === 200) {
          alert("Changes have been saved");
          window.location.assign("http://localhost:3000/profile");
        } else {
        }
      })
      .catch((error) => {
        alert("type error");
        console.log(error);
      });
  }

  return (
    <body className="register">
      <h1>Edit Profile </h1>
      <form onSubmit={handleSubmit}>
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
              defaultValue={userExists.u_firstname}
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
              defaultValue={userExists.u_lastname}
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
              defaultValue={userExists.u_name}
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
              defaultValue={userExists.u_phone}
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
              defaultValue={userExists.credit_address1}
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
              defaultValue={userExists.credit_zip1}
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
              defaultValue={userExists.credit_city1}
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
              defaultValue={userExists.credit_state1}
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
              defaultChecked={userExists.u_promo}
            />
          </label>
        </div>
        <h1 style={{ paddingBottom: "10px" }}>Card 1</h1>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Name:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_name1: event.target.value,
                });
              }}
              type="name"
              defaultValue={userExists.credit_name1}
            />
          </label>
        </div>
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
              defaultValue={creditInfo[0]}
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
              defaultValue={userExists.credit_date1}
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
              defaultValue={userExists.credit_sc1}
            />
          </label>
        </div>
        <h1 style={{ paddingBottom: "10px" }}>Card 2</h1>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Name:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_name2: event.target.value,
                });
              }}
              type="name"
              defaultValue={userExists.credit_name2}
            />
          </label>
        </div>
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
              defaultValue={creditInfo[1]}
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
              defaultValue={userExists.credit_date2}
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
              defaultValue={userExists.credit_sc2}
            />
          </label>
        </div>
        <h1 style={{ paddingBottom: "10px" }}>Card 3</h1>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Card Name:{" "}
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_name3: event.target.value,
                });
              }}
              type="name"
              defaultValue={userExists.credit_name3}
            />
          </label>
        </div>
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
              defaultValue={creditInfo[2]}
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
              defaultValue={userExists.credit_date3}
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
              defaultValue={userExists.credit_sc3}
            />
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label type="submit" className="submit-btn" onClick={handleSubmit}>
            Confirm Changes
          </label>
        </div>
      </form>
    </body>
  );
}
