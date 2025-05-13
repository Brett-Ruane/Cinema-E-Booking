import axios from "axios";
import React, { useState, useEffect } from "react";
import _ from "lodash";

async function fetchData(id) {
  const userId = id;
  try {
    const userExistsResponse = await axios.get(
      `http://localhost:8080/api/user/findUserWithId?u_id=${userId}`
    );
    localStorage.setItem(
      "CurrentUser",
      JSON.stringify(userExistsResponse.data)
    );
    const userExistsJSON = localStorage.getItem("CurrentUser");
    const userExists = JSON.parse(userExistsJSON);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function Profile() {
  const [creditInfo, setCreditInfo] = useState([]);
  // const memoedGetUser = _.memoize(fetchData);
  useEffect(() => {
    //console.log(localStorage.getItem("userId"));
    // memoedGetUser(localStorage.getItem("userId"));
    fetchData(localStorage.getItem("userId"));
    fetchCredit();
  }, []);

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

  const userExistsJSON = localStorage.getItem("CurrentUser");
  const userExists = JSON.parse(userExistsJSON);

  const firstName = userExists.u_firstname;
  const lastName = userExists.u_lastname;
  const userName = userExists.u_name;
  const email = userExists.u_email;
  const homeAddress = userExists.credit_address1;
  const homeZip = userExists.credit_zip1;
  const homeState = userExists.credit_state1;
  const homeCity = userExists.credit_city1;
  const phone = userExists.u_phone;
  const credit_number1 = creditInfo[0];
  const credit_number2 = creditInfo[1];
  const credit_number3 = creditInfo[2];
  const credit_date3 = userExists.credit_date3;
  const credit_date2 = userExists.credit_date2;
  const credit_date1 = userExists.credit_date1;
  const credit_name3 = userExists.credit_name3;
  const credit_name2 = userExists.credit_name2;
  const credit_name1 = userExists.credit_name1;
  const credit_sc1 = userExists.credit_sc1;
  const credit_sc2 = userExists.credit_sc2;
  const credit_sc3 = userExists.credit_sc3;

  return (
    <body className="editP">
      <h1 style={{ padding: "30px", fontSize:'40px' }}>Profile</h1>
      <div classname="firstName" style={{ paddingBottom: "10px" }}>
        First Name: {firstName}
      </div>
      <div classname="lastName" style={{ paddingBottom: "20px" }}>
        Last Name: {lastName}
      </div>
      <div classname="lastName" style={{ paddingBottom: "20px" }}>
        Username: {userName}
      </div>
      <div classname="email" style={{ paddingBottom: "20px" }}>
        Email: {email}
      </div>

      <div classname="homeAddress" style={{ paddingBottom: "20px" }}>
        <p>Home Address</p>
        <p>Street: {homeAddress}</p>
        <p>Zip: {homeZip}</p>
        <p>City: {homeCity}</p>
        <p>State: {homeState}</p>
      </div>

      <div classname="phone" style={{ paddingBottom: "20px" }}>
        Phone Number: {phone}
      </div>

      <div style={{ paddingBottom: "50px" }}>
        <a href="/editProfile">Edit Profile </a>
        <br />
      </div>

      <div classname="password" style={{ paddingBottom: "40px" }}>
        Password: ***********
        <div>
          <a href="/changePassword"> Change Password </a>
        </div>
        <br />
      </div>

      <div
        classname="phone"
        style={{ paddingBottom: "20px", fontSize: "30px" }}
      >
        Payment Options
      </div>
      <body>
        <div style={{ paddingBottom: "20px", fontSize: "20px" }}>Card 1</div>
        <div style={{ paddingBottom: "20px" }}>Card Name: {credit_name1}</div>
        <div style={{ paddingBottom: "20px" }}>
          Card Number:{credit_number1}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          Card Expiration Date:{credit_date1}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          Card Security number:{credit_sc1}
        </div>
      </body>
      <body>
        <div style={{ paddingBottom: "20px", fontSize: "20px" }}>Card 2</div>
        <div style={{ paddingBottom: "20px" }}>Card Name: {credit_name2}</div>
        <div style={{ paddingBottom: "20px" }}>
          Card Number:{credit_number2}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          Card Expiration Date:{credit_date2}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          Card Security number:{credit_sc2}
        </div>
      </body>
      <body>
        <div style={{ paddingBottom: "20px", fontSize: "20px" }}>Card 3</div>
        <div style={{ paddingBottom: "20px" }}>Card Name: {credit_name3}</div>
        <div style={{ paddingBottom: "20px" }}>
          Card Number:{credit_number3}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          Card Expiration Date:{credit_date3}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          Card Security number:{credit_sc3}
        </div>
      </body>
      <body>
        <div className="navbar" style={{ padding: '20px', display: "flex", justifyContent: 'center'}}>
        <li>
        <a href="/payHistory" style={{fontSize: '30px', color: 'white'}}>
          Payment History
        </a>
        </li>
        </div>
      </body>
    </body>
  );
}
