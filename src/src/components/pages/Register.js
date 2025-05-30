/* page for registering for account */

import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [confirmPassword, setconfirmPassword] = useState(""); // used to check if the confirm password is equal to password
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);

  const [user, setUser] = useState({
    //u_id: 0, // You can leave this blank if it's auto-generated by the backend
    u_firstname: "",
    u_lastname: "",
    u_name: "",
    u_pwd: "",
    u_email: "",
    u_phone: "", // Initialize with a default value or leave it blank
    u_mark: "inactive",
    u_promo: 0,
    credit_number1: "",
    credit_number2: "",
    credit_number3: "",
    credit_date3: "",
    credit_date2: "",
    credit_date1: "",
    credit_name3: "",
    credit_name2: "",
    credit_name1: "",
    credit_address1: "",
    credit_city1: "",
    credit_state1: "",
    credit_zip1: 0,
    credit_sc1: 0,
    credit_sc2: 0,
    credit_sc3: 0,
  });

  function setField1() {
    setShowCard1(!showCard1);
  }
  function setField2() {
    setShowCard2(!showCard2);
  }
  function setField3() {
    setShowCard3(!showCard3);
  }

  async function handleSubmit(e) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (showCard1 === true) {
      /* if (name, card number, billing address, etc is invalid)
          alert('Invalid card information for field one') 
          return 
      */
    }

    if (showCard2 === true) {
      /* if (name, card number, billing address, etc is invalid) 
          alert('Invalid card information for field one') 
          return false
      */
    }

    if (showCard3 === true) {
      /* if (name, card number, billing address, etc is invalid) 
          alert('Invalid card information for field one') 
          return false
      */
    }

    if (user.u_firstname === "") {
      alert("Invalid firstname");
      return;
    }
    if (user.u_lastname === "") {
      alert("Invalid lastname");
      return;
    }
    if (user.u_username === "") {
      alert("Invalid username");
      return;
    }
    if (user.u_pwd !== confirmPassword) {
      alert("Password does not match Confirm Password");
      return;
    }
    if (user.u_pwd.length < 8) {
      alert("Invalid Password");
      return;
    }
    if (!re.test(user.u_email)) {
      alert("Invalid Email");
      return;
    }
    console.log(user);
    e.preventDefault();
    try {
      const emailExistsResponse = await axios.get(
        `http://localhost:8080/api/user/findUserByEmail?u_email=${user.u_email}`
      );

      const userExists = emailExistsResponse.data;

      const emailExistsResponseTwo = await axios.get(
        `http://localhost:8080/api/user/getUserByName?u_name=${user.u_name}`
      );

      const userExistsTwo = emailExistsResponseTwo.data;

      if (userExists) {
        alert("User with the same email exists");
      } else if (userExistsTwo) {
        alert("User with the same username exists");
      } else {
        // User with the same email doesn't exist, proceed to add the user
        const addUserResponse = await axios.post(
          "http://localhost:8080/api/user/add",
          user
        );

        console.log(user);

        if (addUserResponse.status === 200) {
          console.log("User added successfully");
          const emailExistsResponse = await axios.post(
            `http://localhost:8080/api/email/send-verification-email?u_email=${user.u_email}`
          );
          const userExistsResponse = await axios.get(
            `http://localhost:8080/api/user/getUserByEmail?u_email=${user.u_email}`
          );
          localStorage.setItem(
            "currentUser",
            JSON.stringify(userExistsResponse.data)
          );
          console.log(localStorage.getItem("currentUser"));
          if (emailExistsResponse.status === 200) {
            alert("Email sent");
            window.location.assign("http://localhost:3000/verify");
          }
          // You can add further actions if the user is added successfully
        } else {
          console.error("Failed to add user");
          alert("User Failed to Add");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("ERROR");
    }
  }

  return (
    <body className="register">
      <h1>Join ABC </h1>
      <div>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            First Name:
            <input
              value={user.u_firstname}
              onChange={(event) => {
                setUser({
                  ...user,
                  u_firstname: event.target.value,
                });
              }}
              type="text"
              name="u_firstname"
            />
          </label>
          (Mandatory)
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Last Name:
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_lastname: event.target.value,
                });
              }}
              type="text"
              name="u_lastname"
            />
          </label>
          (Mandatory)
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Username:
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_name: event.target.value,
                });
              }}
              type="text"
              name="u_name"
            />
          </label>
          (Mandatory)
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Email:
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_email: event.target.value,
                });
              }}
              type="text"
              name="u_email"
            />
          </label>
          (Mandatory)
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Password:
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_pwd: event.target.value,
                });
              }}
              type="password"
              minLength="8"
              name="u_pwd"
            />
            (8 Characters min)(Mandatory)
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Confirm Password:
            <input
              type="password"
              minLength="8"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </label>
          (Mandatory)
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Phone Number:
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  u_phone: event.target.value,
                });
              }}
              type="text"
              name="u_phone"
            />
          </label>
          (Mandatory)
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Receive Promotion
            <input
              onChange={(event) => {
                const value = event.target.checked ? 1 : 0;
                setUser({
                  ...user,
                  u_promo: value,
                });
              }}
              type="checkbox"
              defaultChecked={user.u_promo === 1}
            />
          </label>
        </div>

        <h2 style={{ paddingBottom: "20px" }}>Billing Address (Optional)</h2>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Billing Street:
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_address1: event.target.value,
                });
              }}
              type="text"
            />
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            Zip code:
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_zip1: event.target.value,
                });
              }}
              type="text"
            />
          </label>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <label>
            State(e.g. NY):
            <input
              onChange={(event) => {
                setUser({
                  ...user,
                  credit_state1: event.target.value,
                });
              }}
              type="text"
            />
          </label>
        </div>

        <h2 style={{ paddingBottom: "20px" }}>Credit Cards (Optional)</h2>

        <body>
          <h2 style={{ paddingBottom: "20px" }}>Card 1 (Optional)</h2>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Name:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_name1: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Number:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_number1: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Expiration Date:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_date1: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Security number:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_sc1: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
        </body>

        <h2 style={{ paddingBottom: "20px" }}>Card 2 (Optional)</h2>

        <body>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Name:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_name2: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Number:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_number2: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Expiration Date:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_date2: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Security number:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_sc2: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
        </body>

        <h2 style={{ paddingBottom: "20px" }}>Card 3 (Optional)</h2>

        <body>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Name:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_name3: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Number:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_number3: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Expiration Date:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_date3: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <label>
              Card Security number:
              <input
                onChange={(event) => {
                  setUser({
                    ...user,
                    credit_sc3: event.target.value,
                  });
                }}
                type="text"
              />
            </label>
          </div>
        </body>

        <div style={{ paddingBottom: "20px" }}>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </body>
  );
}
